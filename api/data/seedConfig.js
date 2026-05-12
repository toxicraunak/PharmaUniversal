import Config from '../models/Config.js';

async function seedConfig() {
    const config = await Config.findOne();
    if (!config) {
        await Config.create({
            siteName: "Pharma Universal",
            logo: "/logo.png",
            contact: {
                address: "230 Oxford Rd Kenilworth, IL 60043 USA",
                email: "[EMAIL_ADDRESS]",
                phone: "+1 (123) 456-7890",
                whatsapp: "+11234567890"
            },
            seo: {
                title: "Pharma Universal - A Trusted Online Pharmacy",
                description: "Get the best quality medication online with speedy delivery and safe payment methods.",
                keywords: "pharmacy, online medicine, health, medication",
                ogImage: "/og-image.jpg"
            },
            socialLinks: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                instagram: "https://instagram.com",
                vimeo: "https://vimeo.com"
            }
        });
        console.log('Default config seeded');
    }
}

export default seedConfig;