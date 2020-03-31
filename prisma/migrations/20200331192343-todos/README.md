# Migration `20200331192343-todos`

This migration has been generated by Giovanne <giovanneafonso@gmail.com> at 3/31/2020, 7:23:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `todos`.`Tag` (
    `id` int NOT NULL  AUTO_INCREMENT,
    `slug` varchar(191) NOT NULL DEFAULT '' ,
    PRIMARY KEY (`id`)
) 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `todos`.`Todo` (
    `id` int NOT NULL  AUTO_INCREMENT,
    `name` varchar(191) NOT NULL DEFAULT '' ,
    PRIMARY KEY (`id`)
) 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `todos`.`_TagToTodo` (
    `A` int NOT NULL ,
    `B` int NOT NULL 
) 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE UNIQUE INDEX `Tag.slug` ON `todos`.`Tag`(`slug`)

CREATE UNIQUE INDEX `_TagToTodo_AB_unique` ON `todos`.`_TagToTodo`(`A`,`B`)

CREATE  INDEX `_TagToTodo_B_index` ON `todos`.`_TagToTodo`(`B`)

ALTER TABLE `todos`.`_TagToTodo` ADD FOREIGN KEY (`A`) REFERENCES `todos`.`Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `todos`.`_TagToTodo` ADD FOREIGN KEY (`B`) REFERENCES `todos`.`Todo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200331192343-todos
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,20 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "mysql"
+  url      = env("DB_URL")
+}
+
+model Tag {
+  id    Int    @id @default(autoincrement())
+  slug  String @unique
+  todos Todo[]
+}
+
+model Todo {
+  id   Int    @id @default(autoincrement())
+  name String
+  tags Tag[]
+}
```

