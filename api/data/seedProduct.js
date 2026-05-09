import Product from "../models/Product.js";
import Category from "../models/Category.js";

async function seedProduct() {
    const products = await Product.find();
    if (products.length === 0) {
        const categories = await Category.find();
        
        const antidepressants = categories.find(c => c.slug === 'anti-depressants');
        const anxiety = categories.find(c => c.slug === 'anxiety');
        const pain = categories.find(c => c.slug === 'pain-treatment');
        const sleep = categories.find(c => c.slug === 'sleeping-pills');

        const defaultProducts = [
            // Anti Depressants
            { name: "Sertraline 50mg", slug: "sertraline-50mg", category: antidepressants?._id, price: 50 },
            { name: "Fluoxetine 20mg", slug: "fluoxetine-20mg", category: antidepressants?._id, price: 45 },
            // Anxiety
            { name: "Alprazolam 1mg", slug: "alprazolam-1mg", category: anxiety?._id, price: 60 },
            { name: "Diazepam 5mg", slug: "diazepam-5mg", category: anxiety?._id, price: 40 },
            // Pain
            { name: "Tramadol 100mg", slug: "tramadol-100mg", category: pain?._id, price: 70 },
            { name: "Codeine 30mg", slug: "codeine-30mg", category: pain?._id, price: 55 },
            // Sleep
            { name: "Zolpidem 10mg", slug: "zolpidem-10mg", category: sleep?._id, price: 80 },
            { name: "Zopiclone 7.5mg", slug: "zopiclone-7-5mg", category: sleep?._id, price: 75 },
        ];

        // Filter out any where category wasn't found
        const validProducts = defaultProducts.filter(p => p.category);
        
        await Product.insertMany(validProducts);
        console.log('Default products seeded');
    }
}

export default seedProduct;
