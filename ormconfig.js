module.exports = {
    "type": "sqlite",
    "database": "src/database/database.sqlite",
    "migrations": [process.env.MIGRATIONS],
    "entities": [process.env.ENTITIES],
    "cli": {
        "migrationsDir": "src/database/migrations",
        "entitiesDir": "src/entities"
    }
}