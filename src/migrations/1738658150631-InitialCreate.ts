import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCreate1738658150631 implements MigrationInterface {
    name = 'InitialCreate1738658150631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', \`isActive\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tokens\` (\`id\` varchar(36) NOT NULL, \`token\` varchar(50) NOT NULL, \`type\` enum ('VERIFY', 'RESET_PASS', 'REFRESH', 'ACCESS') NOT NULL DEFAULT 'ACCESS', \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`episodes\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`videoUrl\` varchar(255) NOT NULL, \`releaseDate\` date NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`movieId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`genres\` (\`id\` varchar(36) NOT NULL, \`slug\` varchar(255) NULL DEFAULT '', \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movies\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`releaseDate\` date NULL, \`posterUrl\` varchar(255) NULL, \`posterId\` varchar(255) NULL, \`rating\` decimal(3,1) NULL DEFAULT '0.0', \`type\` enum ('movie', 'series', 'trailer') NOT NULL DEFAULT 'movie', \`seriesName\` varchar(255) NULL DEFAULT '', \`slug\` varchar(255) NULL DEFAULT '', \`partNumber\` int NULL DEFAULT '1', \`fistPart\` tinyint NULL DEFAULT 1, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movies_genres_genres\` (\`moviesId\` varchar(36) NOT NULL, \`genresId\` varchar(36) NOT NULL, INDEX \`IDX_cb43556a8849221b82cd17461c\` (\`moviesId\`), INDEX \`IDX_ccf6c10277da37e9fc265863fa\` (\`genresId\`), PRIMARY KEY (\`moviesId\`, \`genresId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`episodes\` ADD CONSTRAINT \`FK_2fa02881032f28e7f1e30029fca\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movies_genres_genres\` ADD CONSTRAINT \`FK_cb43556a8849221b82cd17461c8\` FOREIGN KEY (\`moviesId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`movies_genres_genres\` ADD CONSTRAINT \`FK_ccf6c10277da37e9fc265863fab\` FOREIGN KEY (\`genresId\`) REFERENCES \`genres\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movies_genres_genres\` DROP FOREIGN KEY \`FK_ccf6c10277da37e9fc265863fab\``);
        await queryRunner.query(`ALTER TABLE \`movies_genres_genres\` DROP FOREIGN KEY \`FK_cb43556a8849221b82cd17461c8\``);
        await queryRunner.query(`ALTER TABLE \`episodes\` DROP FOREIGN KEY \`FK_2fa02881032f28e7f1e30029fca\``);
        await queryRunner.query(`DROP INDEX \`IDX_ccf6c10277da37e9fc265863fa\` ON \`movies_genres_genres\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb43556a8849221b82cd17461c\` ON \`movies_genres_genres\``);
        await queryRunner.query(`DROP TABLE \`movies_genres_genres\``);
        await queryRunner.query(`DROP TABLE \`movies\``);
        await queryRunner.query(`DROP TABLE \`genres\``);
        await queryRunner.query(`DROP TABLE \`episodes\``);
        await queryRunner.query(`DROP TABLE \`tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
