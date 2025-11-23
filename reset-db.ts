// Reset database and insert games
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

async function resetAndSeed() {
    const pool = new Pool({ connectionString });

    try {
        console.log('🗑️  Deleting existing data...');

        // Delete in correct order (foreign keys)
        await pool.query('DELETE FROM "Review"');
        await pool.query('DELETE FROM "Game"');
        await pool.query('DELETE FROM "User" WHERE email != \'admin@cyberdeck.store\'');

        console.log('✅ Deleted old data\n');

        console.log('👤 Creating admin user...');
        await pool.query(`
            INSERT INTO "User" (id, email, name, password, "isAdmin", "createdAt", "updatedAt", image)
            VALUES (
                'admin_001',
                'admin@cyberdeck.store',
                'Admin User',
                '$2b$10$PNn/aWh/eYoOntp3IGFD2.35mEOaEgQMwcIucUOaMFMXMm.hR/cG2',
                true,
                NOW(),
                NOW(),
                'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
            ) ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password
        `);
        console.log('✅ Admin user created\n');

        console.log('🎮 Inserting 8 games...');
        await pool.query(`
            INSERT INTO "Game" (id, title, description, price, "originalPrice", rating, image, category, tags, "isNew", "isTrending", screenshots, "createdAt", "updatedAt")
            VALUES
                ('game_001', 'Neon Nights: Uprising', 'Experience the ultimate cyberpunk adventure in a dystopian metropolis. Hack, fight, and survive in the neon-lit streets of Neo Tokyo.', 59.99, 79.99, 4.8, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070', 'Action', ARRAY['Cyberpunk', 'Open World', 'RPG'], true, true, ARRAY['https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070'], NOW(), NOW()),
                ('game_002', 'Cyber Soul', 'Dive into a world where consciousness meets code. Unravel the mysteries of the digital realm in this mind-bending adventure.', 49.99, NULL, 4.6, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2065', 'Adventure', ARRAY['Story Rich', 'Sci-Fi', 'Mystery'], false, true, ARRAY['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2065'], NOW(), NOW()),
                ('game_003', 'Quantum Breach', 'Hack into the most secure systems in the world. Master the art of digital infiltration in this intense cyberpunk thriller.', 39.99, NULL, 4.5, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070', 'Strategy', ARRAY['Stealth', 'Hacking', 'Puzzle'], false, false, ARRAY['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070'], NOW(), NOW()),
                ('game_004', 'Shadow Protocol', 'Become the ultimate cyber operative. Stealth, combat, and hacking combine in this action-packed thriller.', 44.99, NULL, 4.7, 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=2070', 'Action', ARRAY['Stealth', 'Action', 'Cyberpunk'], true, false, ARRAY['https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=2070'], NOW(), NOW()),
                ('game_005', 'Neural Nexus', 'Connect to the neural network and explore a world beyond reality. Virtual reality meets cyberpunk in this groundbreaking experience.', 54.99, 69.99, 4.9, 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=2074', 'Adventure', ARRAY['VR', 'Cyberpunk', 'Immersive'], true, true, ARRAY['https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=2074'], NOW(), NOW()),
                ('game_006', 'Void Runner', 'Parkour through the neon-lit rooftops of a cyberpunk metropolis. Fast-paced action meets breathtaking visuals.', 29.99, NULL, 4.4, 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=2070', 'Action', ARRAY['Parkour', 'Fast-Paced', 'Platformer'], false, true, ARRAY['https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=2070'], NOW(), NOW()),
                ('game_007', 'Digital Frontier', 'Explore the vast digital landscape where reality and virtuality collide. An epic journey through cyberspace awaits.', 49.99, NULL, 4.6, 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2070', 'Adventure', ARRAY['Exploration', 'Sci-Fi', 'Open World'], false, false, ARRAY['https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2070'], NOW(), NOW()),
                ('game_008', 'Chrome City Chronicles', 'Navigate the gleaming streets of Chrome City in this story-driven cyberpunk RPG. Your choices shape the future.', 59.99, 74.99, 4.8, 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=2070', 'RPG', ARRAY['Story Rich', 'Choice-Based', 'Cyberpunk'], true, true, ARRAY['https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=2070'], NOW(), NOW())
            ON CONFLICT (id) DO NOTHING
        `);

        console.log('✅ 8 games inserted successfully!\n');
        console.log('🎉 Database reset complete!');
        console.log('\nYou can now refresh your browser at http://localhost:3000');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await pool.end();
    }
}

resetAndSeed();
