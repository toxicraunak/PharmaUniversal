import Category from "../models/Category.js";

async function seedCategory() {
    const categories = await Category.find();
    if (categories.length === 0) {
        const defaultCategories = [
            { name: "AntiDepressants", label: "Anti Depressants", slug: "anti-depressants", image: "https://pharmauniversal.com/wp-content/uploads/2021/09/Tile-Img-03-Sex.jpg.webp" },
            { name: "Anxiety", label: "Anxiety Medications", slug: "anxiety", image: "https://pharmauniversal.com/wp-content/uploads/2023/08/anxiety_box.jpg.webp" },
            { name: "Painkillers", label: "Pain Medications", slug: "pain-treatment", image: "https://pharmauniversal.com/wp-content/uploads/2023/08/pain_box.jpg.webp" },
            { name: "Sleeping Pills", label: "Sleeping Pills", slug: "sleeping-pills", image: "https://pharmauniversal.com/wp-content/uploads/2023/08/sp_issue.jpg.webp" },
        ];
        await Category.insertMany(defaultCategories);
        console.log('Default categories seeded');
    }
}

export default seedCategory;