
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Checking for games with invalid image URLs...");
    const games = await prisma.game.findMany();
    let found = false;

    for (const game of games) {
        const issues = [];
        // Check main image
        if (game.image && !game.image.startsWith('http') && !game.image.startsWith('/')) {
            issues.push(`Main Image: "${game.image}"`);
        }

        // Check screenshots
        if (game.screenshots) {
            game.screenshots.forEach((s, i) => {
                if (s && !s.startsWith('http') && !s.startsWith('/')) {
                    issues.push(`Screenshot[${i}]: "${s}"`);
                }
            });
        }

        if (issues.length > 0) {
            found = true;
            console.log(`\n🔴 Game: "${game.title}" (ID: ${game.id})`);
            issues.forEach(issue => console.log(`   - ${issue}`));
        }
    }

    if (!found) {
        console.log("\n✅ No invalid image URLs found in the database.");
    } else {
        console.log("\n⚠️  Found games with invalid URLs. Please fix them in the Admin Panel or database.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
