import Category from "../models/Category.js";

async function seedCategory() {
    const categories = await Category.find();
    if (categories.length === 0) {
        const defaultCategories = [
            { name: "AntiDepressants", label: "Anti Depressants", slug: "anti-depressants" },
            { name: "Anxiety", label: "Anxiety Medications", slug: "anxiety" },
            { name: "Pain Treatment", label: "Pain Treatment", slug: "pain-treatment" },
            { name: "Sleeping Pills", label: "Sleeping Pills", slug: "sleeping-pills" },
        ];
        await Category.insertMany(defaultCategories);
        console.log('Default categories seeded');
    }
}

export default seedCategory;