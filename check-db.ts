// Check what games are in the database
import { prisma } from './lib/prisma';

async function checkGames() {
    try {
        const games = await prisma.game.findMany();

        console.log(`\n📊 Total games in database: ${games.length}\n`);

        if (games.length === 0) {
            console.log('❌ No games found in database!');
        } else {
            games.forEach((game, i) => {
                console.log(`${i + 1}. ${game.title}`);
                console.log(`   Price: $${game.price}`);
                console.log(`   Category: ${game.category}`);
                console.log(`   Image: ${game.image.substring(0, 50)}...`);
                console.log(`   isNew: ${game.isNew}, isTrending: ${game.isTrending}`);
                console.log('');
            });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkGames();
