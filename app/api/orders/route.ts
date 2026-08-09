import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* =========================================================
   SERVER-SIDE PRODUCT CATALOGUE

   IMPORTANT:
   These prices must match your real products.
   The browser price is NEVER trusted.
========================================================= */

const SERVER_PRODUCTS = [
  {
    slug: "hair-growth-oil",
    name: "Advanced Hair Care Oil",
    price: 499,
  },
  {
    slug: "hair-growth-serum",
    name: "Advanced Hair Care Serum",
    price: 549,
  },
  {
    slug: "pneumona-powder",
    name: "Pneumona Powder",
    price: 399,
  },
  {
    slug: "age-revert-pro",
    name: "Age Revert Pro Capsules",
    price: 799,
  },
  {
    slug: "arshvinashak",
    name: "Arshavinashak Syrup",
    price: 449,
  },
  {
    slug: "cough-syrup",
    name: "Tulsipreet Cough Syrup",
    price: 299,
  },
];

type IncomingItem = {
  slug: string;
  quantity: number;
};

type OrderPayload = {
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };

  items: IncomingItem[];

  paymentMethod: "upi" | "cod";

  utrNumber?: string;
};

/* =========================================================
   HEALTH CHECK

   Open:
   http://localhost:3000/api/orders

   If this works, you should see JSON.
========================================================= */

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "BD Ayurveda order API is working.",
  });
}

/* =========================================================
   CREATE ORDER
========================================================= */

export async function POST(request: Request) {
  try {
    /* =====================================================
       1. CHECK SUPABASE ENVIRONMENT VARIABLES
    ===================================================== */

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;
      

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      console.error(
        "NEXT_PUBLIC_SUPABASE_URL is missing.",
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Server configuration error: Supabase URL is missing.",
        },
        {
          status: 500,
        },
      );
    }

    if (!serviceRoleKey) {
      console.error(
        "SUPABASE_SERVICE_ROLE_KEY is missing.",
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Server configuration error: Supabase secret key is missing.",
        },
        {
          status: 500,
        },
      );
    }

    /* =====================================================
       2. CREATE SERVER-SIDE SUPABASE CLIENT
    ===================================================== */

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );

    /* =====================================================
       3. READ REQUEST
    ===================================================== */

    let body: OrderPayload;

    try {
      body = (await request.json()) as OrderPayload;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid order request.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       4. CUSTOMER VALIDATION
    ===================================================== */

    if (!body.customer) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer information is missing.",
        },
        {
          status: 400,
        },
      );
    }

    const {
      fullName,
      phone,
      email,
      address,
      landmark,
      city,
      state,
      pincode,
    } = body.customer;

    if (!fullName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer name is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/^[6-9]\d{9}$/.test(phone?.trim() || "")) {
      return NextResponse.json(
        {
          success: false,
          error: "Enter a valid mobile number.",
        },
        {
          status: 400,
        },
      );
    }

    if (!address?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Delivery address is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!city?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "City is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!state?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "State is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/^[1-9][0-9]{5}$/.test(pincode?.trim() || "")) {
      return NextResponse.json(
        {
          success: false,
          error: "Enter a valid PIN code.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      email?.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim(),
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       5. CART VALIDATION
    ===================================================== */

    if (
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Your cart is empty.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       6. PAYMENT VALIDATION
    ===================================================== */

    if (
      body.paymentMethod !== "upi" &&
      body.paymentMethod !== "cod"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment method.",
        },
        {
          status: 400,
        },
      );
    }

    if (body.paymentMethod === "upi") {
      const utr =
        body.utrNumber
          ?.trim()
          .replace(/\s/g, "") || "";

      if (utr.length < 8 || utr.length > 24) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Enter a valid UTR / transaction reference.",
          },
          {
            status: 400,
          },
        );
      }
    }

    /* =====================================================
       7. REBUILD CART USING SERVER PRICES
    ===================================================== */

    const normalizedItems = [];

    for (const item of body.items) {
      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid product quantity.",
          },
          {
            status: 400,
          },
        );
      }

      const product = SERVER_PRODUCTS.find(
        (serverProduct) =>
          serverProduct.slug === item.slug,
      );

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: `Unknown product: ${item.slug}`,
          },
          {
            status: 400,
          },
        );
      }

      normalizedItems.push({
        product_slug: product.slug,
        product_name: product.name,
        price: product.price,
        quantity,
        line_total:
          product.price * quantity,
      });
    }

    /* =====================================================
       8. CALCULATE TOTALS
    ===================================================== */

    const subtotal =
      normalizedItems.reduce(
        (sum, item) =>
          sum + item.line_total,
        0,
      );

    const FREE_DELIVERY_THRESHOLD = 699;
    const DELIVERY_CHARGE = 79;

    const deliveryCharge =
      subtotal >= FREE_DELIVERY_THRESHOLD
        ? 0
        : DELIVERY_CHARGE;

    const total =
      subtotal + deliveryCharge;

    /* =====================================================
       9. GENERATE ORDER NUMBER
    ===================================================== */

    const date =
      new Date()
        .toISOString()
        .slice(2, 10)
        .replaceAll("-", "");

    const random =
      crypto.randomUUID()
        .replaceAll("-", "")
        .slice(0, 6)
        .toUpperCase();

    const orderNumber =
      `BDA-${date}-${random}`;

    /* =====================================================
       10. PAYMENT STATUS
    ===================================================== */

    const paymentStatus =
      body.paymentMethod === "upi"
        ? "verification_pending"
        : "pending";

    const utrNumber =
      body.paymentMethod === "upi"
        ? body.utrNumber
            ?.trim()
            .replace(/\s/g, "") || null
        : null;

    /* =====================================================
       11. INSERT ORDER
    ===================================================== */

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,

        customer_name:
          fullName.trim(),

        phone:
          phone.trim(),

        email:
          email?.trim() || null,

        address:
          address.trim(),

        landmark:
          landmark?.trim() || null,

        city:
          city.trim(),

        state:
          state.trim(),

        pincode:
          pincode.trim(),

        subtotal,

        delivery_charge:
          deliveryCharge,

        total,

        payment_method:
          body.paymentMethod,

        utr_number:
          utrNumber,

        payment_status:
          paymentStatus,

        order_status:
          "new",
      })
      .select(
        "id, order_number",
      )
      .single();

    if (orderError) {
      console.error(
        "Supabase orders error:",
        orderError,
      );

      return NextResponse.json(
        {
          success: false,

          error:
            `Database error: ${orderError.message}`,
        },
        {
          status: 500,
        },
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Order could not be created.",
        },
        {
          status: 500,
        },
      );
    }

    /* =====================================================
       12. INSERT ORDER ITEMS
    ===================================================== */

    const orderItems =
      normalizedItems.map(
        (item) => ({
          order_id:
            order.id,

          product_slug:
            item.product_slug,

          product_name:
            item.product_name,

          price:
            item.price,

          quantity:
            item.quantity,

          line_total:
            item.line_total,
        }),
      );

    const {
      error: itemsError,
    } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error(
        "Supabase order items error:",
        itemsError,
      );

      /* Remove incomplete order */

      await supabase
        .from("orders")
        .delete()
        .eq(
          "id",
          order.id,
        );

      return NextResponse.json(
        {
          success: false,

          error:
            `Order items error: ${itemsError.message}`,
        },
        {
          status: 500,
        },
      );
    }

    /* =====================================================
       13. SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        orderId:
          order.id,

        orderNumber:
          order.order_number,

        subtotal,

        deliveryCharge,

        total,

        paymentStatus,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "POST /api/orders crashed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error.",
      },
      {
        status: 500,
      },
    );
  }
}