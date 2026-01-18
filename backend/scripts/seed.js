import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Article from "../models/Article.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const password = "password123";
const hashedPassword = await bcrypt.hash(password, 10);

const authorsData = [
    { name: "Advait Sharma", email: "advait@example.com", password: hashedPassword },
    { name: "Ishita Iyer", email: "ishita@example.com", password: hashedPassword },
    { name: "Kabir Malhotra", email: "kabir@example.com", password: hashedPassword },
    { name: "Ananya Gupta", email: "ananya@example.com", password: hashedPassword },
    { name: "Rohan Das", email: "rohan@example.com", password: hashedPassword },
    { name: "Sanya Mehra", email: "sanya@example.com", password: hashedPassword },
    { name: "Vikram Sethi", email: "vikram@example.com", password: hashedPassword },
];

const articlePool = [
    {
        category: "Technology",
        titles: [
            "The Rise of Silicon Valley in Bangalore", "Why AI Won't Replace Writers", "Decentralized Web: A New Hope",
            "The Quantum Leap in Computing", "5G and the Future of IoT", "Cybersecurity in the Age of AI",
            "The Dark Side of Social Algorithms", "Green Tech: Saving the Planet", "The Power of Open Source",
            "Edge Computing Explained", "Robotics in Modern Medicine", "The VR Revolution is Here"
        ],
        imageIds: [
            "1518770660439-4636190af475", "1550751827-4bd374c3f58b", "1517694712202-14dd9538aa97",
            "1519389950473-47ba0277781c", "1451187580459-43490279c0fa", "1558494949-ef010cbdcc4b",
            "1531297484001-80022131f5a1", "1526374965328-7f61d4dc18c5", "1504384308090-c894fdcc538d",
            "1581091226870-2d536f0811b2", "1535223289827-42f1e9919769", "1485827404703-89b55fcc0959",
            "1550744751-2db47553239a", "1498050108023-c5249f4df085", "1496171367470-9ed9a9179d1d",
            "1515233353909-b3d99935ff9e", "1487014675914-9bf099478f73"
        ]
    },
    {
        category: "Design",
        titles: [
            "Minimalist Design: Less is More", "Color Theory in Product Design", "The Future of UX is Voice",
            "Designing for Accessibility", "Typography: The Silent Language", "The Role of Micro-animations",
            "Bauhaus Impact on Modern Web", "Sustainability in Product Design", "Psychology of Mobile Layouts",
            "Dark Mode: Design vs Utility", "The Art of User Interviews", "Prototyping like a Pro"
        ],
        imageIds: [
            "1586717791821-3f44a563eb4c", "1558655146-d09347e92766", "1613909209432-d9229db9954b",
            "1545235617-9465d2a55698", "1522071823990-95603c44745d", "1497215728101-856f4ea42174",
            "1512295767273-ac109ac3acbc", "1503387762-592cd58dc47b", "1551434678-e076c223a692",
            "1581291518633-83b4b3c921c3", "1523275335684-37898b6baf30", "1561070791-2526d30994b5",
            "1550684841-db7a659ef997", "1618005182384-a83a8bd57fbe", "1609921212029-bb5fe85a8fc2",
            "1508962914676-134849a727f0", "1551033406-af99f0e63717"
        ]
    },
    {
        category: "Lifestyle",
        titles: [
            "Finding Peace in the Chaos", "The Digital Nomad Lifestyle", "Sustainable Living in Cities",
            "The Power of Morning Routines", "Plant-Based Diet: Myths Busted", "Travel Guide to Hidden Hampi",
            "The Art of Journaling", "Minimalism: My 1-Year Journey", "Mental Health in High-Stress Jobs",
            "The Joy of Small-Batch Cooking", "Cultivating a Creative Workspace", "Fitness Hacks for Busy People"
        ],
        imageIds: [
            "1506126613408-eca07ce68773", "1545231027-634d0f023ea5", "1511467687858-23d96c32e4ae",
            "1502082553048-f009c37129b9", "1512621776951-a57141f2eefd", "1469854523086-cc02fe5d8800",
            "1517841323824-0691e4142b8a", "1501785888041-af3ef285b470", "1447452001602-7090c7ab2db3",
            "1470252649378-9c29740c9fa8", "1499750310117-099d330438a1", "1571019613531-fbeec7e9c1e0",
            "1522202176988-66273c2fd55f", "1551970634-747846a548bb", "1511632765486-a0179058aa27",
            "1472393365320-dc77242e298c", "1516738901171-8c44758b1580"
        ]
    },
    {
        category: "Business",
        titles: [
            "Startups: The First 100 Days", "The Future of Remote Work", "Investment Strategies for Gen Z",
            "Building a Brand that Lasts", "The Creator Economy in India", "Leadership Lessons from Cricket",
            "Scaling Small Businesses", "The Power of Networking", "Marketing in the 2020s",
            "Subscription Models: Why they Work", "Crisis Management for Beginners", "The Gig Economy Shift"
        ],
        imageIds: [
            "1460925895917-afdab827c52f", "1507679799987-c73779587ccf", "1553484771-33162624fcce",
            "1542744173-8e7e53415bb0", "1519085360753-af0119f7cbe7", "1552664730-d307ca884978",
            "1454165804606-c3d5fbc56ed7", "1557804506-669a67965ba0", "1533750516-a7335359336b",
            "1516321318423-f06f85e504b3", "1450101496193-61c0d1f7326d", "1664575602276-acd07a7c8c32",
            "1512428559087-560fa5ceab44", "1516321497487-e23e7ecd3c97", "1459491619139-d108605ee3d8",
            "1521737604891-41719a4a7891", "1553729459-05a46d1e576b"
        ]
    }
];

const seedDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        if (!process.env.MONGO_URL) throw new Error("MONGO_URL is not defined in .env");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected successfully to DB.");

        // Clean slate
        const authorEmails = authorsData.map(a => a.email);
        console.log("Finding existing seeded users...");
        const usersToDelete = await User.find({ email: { $in: authorEmails } });
        const userIds = usersToDelete.map(u => u._id);

        if (userIds.length > 0) {
            console.log(`Deleting ${userIds.length} old seeded authors and their articles...`);
            await Article.deleteMany({ author: { $in: userIds } });
            await User.deleteMany({ _id: { $in: userIds } });
        } else {
            console.log("No previous seeded data found.");
        }

        console.log("Seeding New Authors...");
        const createdAuthors = [];
        for (const authorEntry of authorsData) {
            const user = await User.create(authorEntry);
            createdAuthors.push(user);
        }

        console.log("Generating Unique Articles...");
        const articlesToInsert = [];

        const usedImages = new Set();
        const usedTitles = new Set();

        let count = 0;
        while (count < 45) {
            const pool = articlePool[Math.floor(Math.random() * articlePool.length)];

            // Pick a title that hasn't been used
            const availableTitles = pool.titles.filter(t => !usedTitles.has(t));
            if (availableTitles.length === 0) continue; // Should not happen with 12x4 = 48 titles
            const title = availableTitles[Math.floor(Math.random() * availableTitles.length)];

            // Pick an image that hasn't been used
            const availableImages = pool.imageIds.filter(img => !usedImages.has(img));
            if (availableImages.length === 0) continue;
            const imgId = availableImages[Math.floor(Math.random() * availableImages.length)];

            usedTitles.add(title);
            usedImages.add(imgId);

            const author = createdAuthors[Math.floor(Math.random() * createdAuthors.length)];
            const unsplashUrl = `https://images.unsplash.com/photo-${imgId}?w=1200&h=800&fit=crop&auto=format&q=80`;

            console.log(`[SEED] Uploading image for "${title}" to Cloudinary...`);
            let finalImageUrl = unsplashUrl;
            try {
                const uploadRes = await cloudinary.uploader.upload(unsplashUrl, {
                    folder: "novus_blog_seeded",
                });
                finalImageUrl = uploadRes.secure_url;
            } catch (err) {
                console.error(`[SEED] Failed to upload to Cloudinary for "${title}", using fallback Unsplash:`, err.message);
                continue;
            }

            articlesToInsert.push({
                title: title,
                content: `In this deep dive, ${author.name} explores the fascinating world of ${pool.category.toLowerCase()}. 

Our analysis shows that ${title} is more than just a passing trend. It represents a fundamental shift in how we approach ${pool.category === 'Technology' ? 'innovation' : pool.category === 'Design' ? 'aesthetics' : 'daily life'}. 

From local observations in India to global perspectives, the story of ${title} is one of growth, challenge, and opportunity. At Novus, we are committed to bringing you the most authentic voices on these subjects. 

Whether you are a professional or an enthusiast, there is something in this piece for everyone. Stay tuned as we continue to track the evolution of ${pool.category}.`,
                thumbnail: finalImageUrl,
                category: pool.category,
                author: author._id,
                upvotes: Math.floor(Math.random() * 16), // 0 to 15
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 2592000000)), // Random date in last 30 days
            });
            count++;
        }

        await Article.insertMany(articlesToInsert);
        console.log(`Successfully seeded ${articlesToInsert.length} unique articles!`);

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error during seeding:", error);
        process.exit(1);
    }
};

seedDB();
