// Quick diagnostic script to check game images in the database
// Run with: npx tsx check-game-images.ts

import { prisma } from './lib/prisma';

async function checkGameImages() {
    try {
        const games = await prisma.game.findMany({
            select: {
                id: true,
                title: true,
                image: true,
            },
        });

        console.log(`\n📊 Found ${games.length} games in database:\n`);

        games.forEach((game, index) => {
            console.log(`${index + 1}. ${game.title}`);
            console.log(`   Image: ${game.image}`);
            console.log(`   Valid URL: ${game.image.startsWith('http') ? '✅' : '❌'}`);
            console.log('');
        });

        // Check for broken images
        const brokenImages = games.filter(g => !g.image.startsWith('http'));
        if (brokenImages.length > 0) {
            console.log(`\n⚠️  Found ${brokenImages.length} games with potentially broken images:`);
            brokenImages.forEach(g => console.log(`   - ${g.title}: ${g.image}`));
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkGameImages();
