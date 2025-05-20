CREATE TYPE "public"."bagPosition" AS ENUM('back', 'frame', 'handlebar', 'seat', 'top tube', 'rear rack', 'stem', 'fork');--> statement-breakpoint
CREATE TYPE "public"."bagType" AS ENUM('backpack', 'bike bag');--> statement-breakpoint
CREATE TABLE "bags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"type" "bagType" NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text,
	"brand" text,
	"weight" integer,
	"quantity" integer,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "items_to_bags" (
	"bag_id" integer NOT NULL,
	"item_id" integer NOT NULL,
	CONSTRAINT "items_to_bags_bag_id_item_id_pk" PRIMARY KEY("bag_id","item_id")
);
--> statement-breakpoint
ALTER TABLE "bags" ADD CONSTRAINT "bags_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items_to_bags" ADD CONSTRAINT "items_to_bags_bag_id_bags_id_fk" FOREIGN KEY ("bag_id") REFERENCES "public"."bags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items_to_bags" ADD CONSTRAINT "items_to_bags_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;