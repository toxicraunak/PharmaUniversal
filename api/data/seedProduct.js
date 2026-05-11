// seeders/seedProduct.js

import Product from "../models/Product.js";
import Category from "../models/Category.js";

async function seedProduct() {
  const products = await Product.find();

  if (products.length > 0) {
    console.log("Products already seeded");
    return;
  }

  const categories = await Category.find();

  const antidepressants = categories.find(
    (c) => c.slug === "anti-depressants"
  );

  const anxiety = categories.find(
    (c) => c.slug === "anxiety"
  );

  const pain = categories.find(
    (c) => c.slug === "pain-treatment"
  );

  const sleep = categories.find(
    (c) => c.slug === "sleeping-pills"
  );

  const defaultProducts = [
    // =========================
    // Anti Depressants
    // =========================

    {
      name: "Sertraline",
      fullName: "Sertraline 50mg Tablets",
      slug: "sertraline-50mg",
      image: "https://pharmauniversal.com/wp-content/uploads/2023/04/clovidol_100.png.webp",
      category: antidepressants?._id,

      isAvailable: true,
      onFooter: true,
      onSale: true,

      features: [
        "Used to treat depression and anxiety disorders",
        "Fast US shipping available",
        "High customer satisfaction",
        "Genuine medication",
        "Affordable pricing"
      ],

      packages: [
        {
          label: "60 Pills",
          price: 50,
          mrp: 80
        },
        {
          label: "120 Pills",
          price: 90,
          mrp: 140
        }
      ],

      tags: [
        "sertraline",
        "antidepressant",
        "depression",
        "anxiety"
      ],

      description: `
        <h2>Sertraline 50mg Tablets</h2>
        <p>
          Sertraline is commonly prescribed for depression,
          panic attacks, anxiety, and mood disorders.
        </p>
      `,
    },

    {
      name: "Fluoxetine",
      fullName: "Fluoxetine 20mg Capsules",
      slug: "fluoxetine-20mg",
      image: "https://pharmauniversal.com/wp-content/uploads/2022/09/oxycodeine-450x321.png",
      category: antidepressants?._id,

      isAvailable: true,
      onFooter: false,
      onSale: true,

      features: [
        "Popular SSRI medication",
        "Helps improve mood and sleep",
        "US to US delivery",
        "Low price guaranteed",
        "Trusted generic medicine"
      ],

      packages: [
        {
          label: "30 Capsules",
          price: 45,
          mrp: 70
        }
      ],

      tags: [
        "fluoxetine",
        "prozac",
        "depression",
        "ssri"
      ],

      description: `
        <h2>Fluoxetine 20mg Capsules</h2>
        <p>
          Fluoxetine is widely used to treat depression,
          OCD, panic disorder, and anxiety.
        </p>
      `,
    },

    // =========================
    // Anxiety
    // =========================

    {
      name: "Alprazolam",
      fullName: "Alprazolam 1mg Tablets",
      slug: "alprazolam-1mg",
      image: "https://pharmauniversal.com/wp-content/uploads/2023/04/trakem_100.png.webp",
      category: anxiety?._id,

      isAvailable: true,
      onFooter: true,
      onSale: false,

      features: [
        "Used for anxiety and panic disorders",
        "Trending anxiety medication",
        "Quick delivery in the USA",
        "Secure packaging",
        "Affordable rates"
      ],

      packages: [
        {
          label: "60 Pills",
          price: 60,
          mrp: 95
        }
      ],

      tags: [
        "alprazolam",
        "xanax",
        "anxiety",
        "panic-disorder"
      ],

      description: `
        <h2>Alprazolam 1mg Tablets</h2>
        <p>
          Alprazolam helps manage anxiety disorders,
          panic attacks, and stress symptoms.
        </p>
      `,
    },

    {
      name: "Diazepam",
      fullName: "Diazepam 5mg Tablets",
      slug: "diazepam-5mg",
      image: "https://pharmauniversal.com/wp-content/uploads/2021/08/pain_o-soma.png.webp",
      category: anxiety?._id,

      isAvailable: true,
      onFooter: false,
      onSale: false,

      features: [
        "Helps relieve anxiety and muscle spasms",
        "Long trusted medication",
        "US domestic shipping",
        "Top quality tablets",
        "Best value packs"
      ],

      packages: [
        {
          label: "90 Pills",
          price: 40,
          mrp: 65
        }
      ],

      tags: [
        "diazepam",
        "valium",
        "anxiety"
      ],

      description: `
        <h2>Diazepam 5mg Tablets</h2>
        <p>
          Diazepam is used for anxiety disorders,
          alcohol withdrawal, and muscle spasms.
        </p>
      `,
    },

    // =========================
    // Pain Treatment
    // =========================

    {
      name: "Tramadol",
      fullName: "Tramadol 100mg Tablets",
      slug: "tramadol-100mg",
      image: "https://pharmauniversal.com/wp-content/uploads/2022/09/lypin2.png.webp",
      category: pain?._id,

      isAvailable: true,
      onFooter: true,
      onSale: true,

      features: [
        "Used to treat moderate to severe pain",
        "Trending painkiller medication",
        "Fast delivery in 3-4 days",
        "Lowest price guaranteed",
        "Trusted by repeat customers"
      ],

      packages: [
        {
          label: "120 Pills",
          price: 70,
          mrp: 110
        }
      ],

      tags: [
        "tramadol",
        "painkiller",
        "pain-relief"
      ],

      description: `
        <h2>Tramadol 100mg Tablets</h2>
        <p>
          Tramadol is an opioid pain medication
          used to manage moderate to severe pain.
        </p>
      `,
    },

    {
      name: "Codeine",
      fullName: "Codeine 30mg Tablets",
      slug: "codeine-30mg",
      image: "https://pharmauniversal.com/wp-content/uploads/2022/09/jpdol-450x344.png",
      category: pain?._id,

      isAvailable: true,
      onFooter: false,
      onSale: false,

      features: [
        "Effective pain management medicine",
        "Reliable prescription medication",
        "US to US shipping available",
        "Discreet packaging",
        "Competitive pricing"
      ],

      packages: [
        {
          label: "60 Pills",
          price: 55,
          mrp: 85
        }
      ],

      tags: [
        "codeine",
        "painkiller",
        "pain-treatment"
      ],

      description: `
        <h2>Codeine 30mg Tablets</h2>
        <p>
          Codeine is commonly used for pain relief
          and cough suppression treatment.
        </p>
      `,
    },

    // =========================
    // Sleeping Pills
    // =========================

    {
      name: "Zolpidem",
      fullName: "Zolpidem 10mg Tablets",
      slug: "zolpidem-10mg",
      image: "https://pharmauniversal.com/wp-content/uploads/2022/06/alpz.png.webp",
      category: sleep?._id,

      isAvailable: true,
      onFooter: true,
      onSale: true,

      features: [
        "Used to treat insomnia",
        "Helps improve sleep quality",
        "Fast shipping across the USA",
        "Genuine medication",
        "Popular sleeping pill"
      ],

      packages: [
        {
          label: "30 Pills",
          price: 80,
          mrp: 120
        }
      ],

      tags: [
        "zolpidem",
        "sleeping-pill",
        "insomnia"
      ],

      description: `
        <h2>Zolpidem 10mg Tablets</h2>
        <p>
          Zolpidem helps people with insomnia
          fall asleep faster and sleep longer.
        </p>
      `,
    },

    {
      name: "Zopiclone",
      fullName: "Zopiclone 7.5mg Tablets",
      slug: "zopiclone-7-5mg",
      image: "https://pharmauniversal.com/wp-content/uploads/2021/08/xanax-450x269.png",
      category: sleep?._id,

      isAvailable: true,
      onFooter: false,
      onSale: true,

      features: [
        "Short-term insomnia treatment",
        "Improves sleep cycle",
        "US domestic delivery",
        "High-quality tablets",
        "Trusted sleep medication"
      ],

      packages: [
        {
          label: "60 Pills",
          price: 75,
          mrp: 110
        }
      ],

      tags: [
        "zopiclone",
        "sleep",
        "insomnia"
      ],

      description: `
        <h2>Zopiclone 7.5mg Tablets</h2>
        <p>
          Zopiclone is prescribed for short-term
          treatment of sleeping problems.
        </p>
      `,
    }
  ];

  // Remove invalid category products
  const validProducts = defaultProducts.filter(
    (p) => p.category
  );

  await Product.insertMany(validProducts);

  console.log("Default products seeded successfully");
}

export default seedProduct;