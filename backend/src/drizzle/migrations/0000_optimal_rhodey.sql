CREATE TABLE "newsletter_user" (
	"sr_no" serial PRIMARY KEY NOT NULL,
	"uid" varchar(36) NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "newsletter_user_email_unique" UNIQUE("email")
);
