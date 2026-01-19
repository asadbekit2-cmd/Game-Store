import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@cyberdeck.store' },
        update: {},
        create: {
            email: 'admin@cyberdeck.store',
            name: 'Admin User',
            password: hashedPassword,
            isAdmin: true,
        },
    });

    console.log('✅ Created admin user:', admin.email);

    // Create regular users for reviews
    const user1 = await prisma.user.upsert({
        where: { email: 'cyberninja@example.com' },
        update: {},
        create: {
            email: 'cyberninja@example.com',
            name: 'CyberNinja99',
            password: await bcrypt.hash('password123', 10),
            isAdmin: false,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'neondrifter@example.com' },
        update: {},
        create: {
            email: 'neondrifter@example.com',
            name: 'NeonDrifter',
            password: await bcrypt.hash('password123', 10),
            isAdmin: false,
        },
    });

    console.log('✅ Created test users');

    // Create games
    const games = [
        {
            title: "Neon Nights: Uprising",
            description: "Experience the ultimate cyberpunk adventure in a dystopian metropolis. Hack, fight, and survive in the neon-lit streets of Neo Tokyo.",
            price: 59.99,
            originalPrice: 79.99,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070",
            category: "Action",
            tags: ["Cyberpunk", "Open World", "RPG"],
            isNew: true,
            isTrending: true,
            screenshots: [
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2071"
            ],
        },
        {
            title: "Cyber Soul",
            description: "Dive into a world where consciousness meets code. Unravel the mysteries of the digital realm in this mind-bending adventure.",
            price: 49.99,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2065",
            category: "Adventure",
            tags: ["Story Rich", "Sci-Fi", "Mystery"],
            isNew: false,
            isTrending: true,
            screenshots: [
                "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2065"
            ],
        },
        {
            title: "Data Heist 2099",
            description: "Assemble your crew and pull off the ultimate digital heist. Stealth, strategy, and hacking combine in this thrilling cyberpunk caper.",
            price: 39.99,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070",
            category: "Strategy",
            tags: ["Stealth", "Heist", "Multiplayer"],
            isNew: false,
            isTrending: false,
            screenshots: [
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070"
            ],
        },
        {
            title: "Neural Warfare",
            description: "Engage in tactical combat where mind meets machine. Command your squad in this revolutionary strategy game.",
            price: 44.99,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=2070",
            category: "Strategy",
            tags: ["Tactical", "Sci-Fi", "Turn-Based"],
            isNew: true,
            isTrending: false,
            screenshots: [],
        },
        {
            title: "Mech Warrior: Arena",
            description: "Pilot massive mechs in intense PvP battles. Customize your war machine and dominate the arena.",
            price: 29.99,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=2074",
            category: "Action",
            tags: ["Mechs", "Multiplayer", "Combat"],
            isNew: false,
            isTrending: true,
            screenshots: [
                "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2070"
            ],
        }
    ];

    const createdGames = [];
    for (const gameData of games) {
        const game = await prisma.game.create({
            data: gameData,
        });
        createdGames.push(game);
        console.log(`✅ Created game: ${game.title}`);
    }

    // Add games to user libraries
    if (createdGames.length > 0) {
        // Admin gets all games
        await prisma.user.update({
            where: { id: admin.id },
            data: {
                library: {
                    connect: createdGames.map(g => ({ id: g.id }))
                }
            }
        });

        // User 1 gets first 3 games
        await prisma.user.update({
            where: { id: user1.id },
            data: {
                library: {
                    connect: createdGames.slice(0, 3).map(g => ({ id: g.id }))
                }
            }
        });

        console.log('✅ Populated user libraries');
    }

    // Create reviews for the first game
    const firstGame = await prisma.game.findFirst();

    if (firstGame) {
        await prisma.review.create({
            data: {
                rating: 5,
                comment: "Absolutely mind-blowing! The cyberpunk atmosphere is perfect, and the gameplay is incredibly addictive. Best game I've played this year!",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja99",
                date: "2 days ago",
                userId: user1.id,
                gameId: firstGame.id,
                approved: true,
            },
        });

        await prisma.review.create({
            data: {
                rating: 4,
                comment: "Great game with stunning visuals. The story could be a bit longer, but overall a fantastic experience.",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NeonDrifter",
                date: "1 week ago",
                userId: user2.id,
                gameId: firstGame.id,
                approved: true,
            },
        });

        console.log('✅ Created reviews');
    }

    console.log('🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
