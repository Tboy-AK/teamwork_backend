-- create sequences


CREATE SEQUENCE IF NOT EXISTS auths_id_seq;
CREATE SEQUENCE IF NOT EXISTS genders_id_seq;
CREATE SEQUENCE IF NOT EXISTS departments_id_seq;
CREATE SEQUENCE IF NOT EXISTS job_titles_id_seq;
CREATE SEQUENCE IF NOT EXISTS users_id_seq;
CREATE SEQUENCE IF NOT EXISTS categories_id_seq;
CREATE SEQUENCE IF NOT EXISTS articles_id_seq;
CREATE SEQUENCE IF NOT EXISTS gifs_id_seq;
CREATE SEQUENCE IF NOT EXISTS article_comments_id_seq;
CREATE SEQUENCE IF NOT EXISTS gif_comments_id_seq;


-- drop tables


DROP TABLE IF EXISTS auths CASCADE;
DROP TABLE IF EXISTS genders CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS job_titles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS gifs CASCADE;
DROP TABLE IF EXISTS article_comments CASCADE;
DROP TABLE IF EXISTS gif_comments CASCADE;


-- create tables


-- This table is for authentication and authorization purposes
CREATE TABLE IF NOT EXISTS auths
(
    _id INTEGER GENERATED ALWAYS AS IDENTITY,
    email CHARACTER VARYING(100) COLLATE pg_catalog."default" NOT NULL,
    _password CHARACTER VARYING(1024) COLLATE pg_catalog."default",
    _version INTEGER DEFAULT 1 NOT NULL,
    date_time_created timestamptz NOT NULL,
    date_time_modified timestamptz NOT NULL,
    CONSTRAINT auths_pkey PRIMARY KEY (_id),
    CONSTRAINT auths_email_key UNIQUE (email)
);

-- This table is for the gender types
CREATE TABLE IF NOT EXISTS genders
(
    _id INTEGER GENERATED ALWAYS AS IDENTITY,
    _name CHARACTER VARYING(100) COLLATE pg_catalog."default" NOT NULL,
    "desc" CHARACTER VARYING(1024) COLLATE pg_catalog."default",
    date_time_created timestamptz NOT NULL,
    date_time_modified timestamptz NOT NULL,
    CONSTRAINT genders_pkey PRIMARY KEY (_id),
    CONSTRAINT genders_name_key UNIQUE (_name)
);

-- This table is for the departments in the organisation
CREATE TABLE IF NOT EXISTS departments
(
    _id INTEGER GENERATED ALWAYS AS IDENTITY,
    _name CHARACTER VARYING(100) COLLATE pg_catalog."default" NOT NULL,
    "desc" CHARACTER VARYING(1024) COLLATE pg_catalog."default",
    date_time_created timestamptz NOT NULL,
    date_time_modified timestamptz NOT NULL,
    CONSTRAINT departments_pkey PRIMARY KEY (_id),
    CONSTRAINT departments_name_key UNIQUE (_name)
);

-- This table is for the job titles in the organisation
CREATE TABLE IF NOT EXISTS job_titles
(
    _id INTEGER GENERATED ALWAYS AS IDENTITY,
    _name CHARACTER VARYING(100) COLLATE pg_catalog."default" NOT NULL,
    "desc" CHARACTER VARYING(1024) COLLATE pg_catalog."default",
    date_time_created timestamptz NOT NULL,
    date_time_modified timestamptz NOT NULL,
    CONSTRAINT job_titles_pkey PRIMARY KEY (_id),
    CONSTRAINT job_titles_name_key UNIQUE (_name)
);

-- This table stores the user profile
CREATE TABLE IF NOT EXISTS users
(
    _id INTEGER GENERATED ALWAYS AS IDENTITY,
    email CHARACTER VARYING(100) COLLATE pg_catalog."default" NOT NULL,
    first_name CHARACTER VARYING(30) COLLATE pg_catalog."default" NOT NULL,
    last_name CHARACTER VARYING(30) COLLATE pg_catalog."default" NOT NULL,
    phone CHARACTER VARYING(30) COLLATE pg_catalog."default" NOT NULL,
    gender_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    job_title_id INTEGER NOT NULL,
    address CHARACTER VARYING(512) COLLATE pg_catalog."default" NOT NULL,
    date_time_created timestamptz NOT NULL,
    date_time_modified timestamptz NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (_id),
    CONSTRAINT gender_id_fkey FOREIGN KEY (gender_id)
        REFERENCES public.genders (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT department_id_fkey FOREIGN KEY (department_id)
        REFERENCES public.departments (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT job_title_id_fkey FOREIGN KEY (job_title_id)
        REFERENCES public.job_titles (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT Users_email_key UNIQUE (email),
    CONSTRAINT Users_phone_key UNIQUE (phone)
);

-- This table is for the categories that an article or GIF belongs to
CREATE TABLE IF NOT EXISTS categories
(
    _id INTEGER GENERATED ALWAYS AS IDENTITY,
    _name CHARACTER VARYING(100) COLLATE pg_catalog."default" NOT NULL,
    "desc" CHARACTER VARYING(1024) COLLATE pg_catalog."default",
    date_time_created timestamptz NOT NULL,
    date_time_modified timestamptz NOT NULL,
    CONSTRAINT Categories_pkey PRIMARY KEY (_id),
    CONSTRAINT Categories_name_key UNIQUE (_name)
);

-- This table stores the articles posted by users
CREATE TABLE IF NOT EXISTS articles
(
    _id INTEGER GENERATED ALWAYS AS IDENTITY,
    title CHARACTER VARYING(30) COLLATE pg_catalog."default" NOT NULL,
    article_body TEXT COLLATE pg_catalog."default" NOT NULL,
    author_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    _flag BOOLEAN DEFAULT FALSE NOT NULL,
    date_time_created timestamptz NOT NULL,
    date_time_modified timestamptz NOT NULL,
    CONSTRAINT articles_pkey PRIMARY KEY (_id),
    CONSTRAINT author_id_fkey FOREIGN KEY (author_id)
        REFERENCES public.users (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.categories (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- This table stores the gifs posted by users
CREATE TABLE IF NOT EXISTS gifs
(
    _id INTEGER GENERATED ALWAYS AS IDENTITY,
    image_uri CHARACTER VARYING (255) COLLATE pg_catalog."default" NOT NULL,
    author_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    _flag BOOLEAN DEFAULT FALSE,
    date_time_created timestamptz NOT NULL,
    date_time_modified timestamptz NOT NULL,
    CONSTRAINT gifs_pkey PRIMARY KEY (_id),
    CONSTRAINT author_id_fkey FOREIGN KEY (author_id)
        REFERENCES public.users (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.categories (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- This table stores the comments made by users on articles
CREATE TABLE IF NOT EXISTS article_comments
(
    _id INTEGER GENERATED ALWAYS AS IDENTITY,
    comment_body CHARACTER VARYING (255) COLLATE pg_catalog."default" NOT NULL,
    author_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    _flag BOOLEAN DEFAULT FALSE,
    date_time_created timestamptz NOT NULL,
    date_time_modified timestamptz NOT NULL,
    CONSTRAINT article_comments_pkey PRIMARY KEY (_id),
    CONSTRAINT article_id_fkey FOREIGN KEY (article_id)
        REFERENCES public.articles (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- This table stores the comments made by users on gifs
CREATE TABLE IF NOT EXISTS gif_comments
(
    _id INTEGER GENERATED ALWAYS AS IDENTITY,
    comment_body CHARACTER VARYING (255) COLLATE pg_catalog."default" NOT NULL,
    author_id INTEGER NOT NULL,
    gif_id INTEGER NOT NULL,
    _flag BOOLEAN DEFAULT FALSE,
    date_time_created timestamptz NOT NULL,
    date_time_modified timestamptz NOT NULL,
    CONSTRAINT gif_comments_pkey PRIMARY KEY (_id),
    CONSTRAINT gif_id_fkey FOREIGN KEY (gif_id)
        REFERENCES public.gifs (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- create functions


CREATE FUNCTION public.timestamp_on_create()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$BEGIN
	NEW.date_time_created := CURRENT_TIMESTAMP;
	RETURN NEW;
END;$BODY$;

COMMENT ON FUNCTION public.timestamp_on_create()
    IS 'Time stamp to track the date and time of creation of a table row data';

CREATE FUNCTION public.timestamp_on_modify()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$BEGIN
	NEW.date_time_modified := CURRENT_TIMESTAMP;
	RETURN NEW;
END;$BODY$;

COMMENT ON FUNCTION public.timestamp_on_modify()
    IS 'Time stamp to track the date and time of modification of a table row data';

CREATE FUNCTION public.data_version_on_modify()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$BEGIN
	NEW._version := NEW._version + 1;
	RETURN NEW;
END;$BODY$;

COMMENT ON FUNCTION public.data_version_on_modify()
    IS 'Time stamp to track the date and time of modification of a table row data';


-- create triggers


CREATE TRIGGER auths_timestamp_on_create
    BEFORE INSERT
    ON public.auths
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_create();

COMMENT ON TRIGGER auths_timestamp_on_create ON public.auths
    IS 'Date and time of creation of a user authentication detail';


CREATE TRIGGER auths_timestamp_on_modify
    BEFORE INSERT OR UPDATE
    ON public.auths
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_modify();

COMMENT ON TRIGGER auths_timestamp_on_modify ON public.auths
    IS 'Date and time of modification of a user authentication detail';


CREATE TRIGGER auths_data_version_on_modify
    BEFORE UPDATE
    ON public.auths
    FOR EACH ROW
    EXECUTE PROCEDURE public.data_version_on_modify();

COMMENT ON TRIGGER auths_data_version_on_modify ON public.auths
    IS 'Authentication versioning';


CREATE TRIGGER users_timestamp_on_create
    BEFORE INSERT
    ON public.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_create();

COMMENT ON TRIGGER users_timestamp_on_create ON public.users
    IS 'Date and time of creation of a user account';


CREATE TRIGGER users_timestamp_on_modify
    BEFORE INSERT OR UPDATE
    ON public.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_modify();

COMMENT ON TRIGGER users_timestamp_on_modify ON public.users
    IS 'Date and time of modification of a user account';


CREATE TRIGGER genders_timestamp_on_create
    BEFORE INSERT
    ON public.genders
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_create();

COMMENT ON TRIGGER genders_timestamp_on_create ON public.genders
    IS 'Date and time of creation of a user authentication detail';


CREATE TRIGGER genders_timestamp_on_modify
    BEFORE INSERT OR UPDATE
    ON public.genders
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_modify();

COMMENT ON TRIGGER genders_timestamp_on_modify ON public.genders
    IS 'Date and time of modification of a user authentication detail';


CREATE TRIGGER departments_timestamp_on_create
    BEFORE INSERT
    ON public.departments
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_create();

COMMENT ON TRIGGER departments_timestamp_on_create ON public.departments
    IS 'Date and time of creation of a user account';


CREATE TRIGGER departments_timestamp_on_modify
    BEFORE INSERT OR UPDATE
    ON public.departments
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_modify();

COMMENT ON TRIGGER departments_timestamp_on_modify ON public.departments
    IS 'Date and time of modification of a user account';


CREATE TRIGGER job_titles_timestamp_on_create
    BEFORE INSERT
    ON public.job_titles
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_create();

COMMENT ON TRIGGER job_titles_timestamp_on_create ON public.job_titles
    IS 'Date and time of creation of a user authentication detail';


CREATE TRIGGER job_titles_timestamp_on_modify
    BEFORE INSERT OR UPDATE
    ON public.job_titles
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_modify();

COMMENT ON TRIGGER job_titles_timestamp_on_modify ON public.job_titles
    IS 'Date and time of modification of a user authentication detail';


CREATE TRIGGER categories_timestamp_on_create
    BEFORE INSERT
    ON public.categories
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_create();

COMMENT ON TRIGGER categories_timestamp_on_create ON public.categories
    IS 'Date and time of creation of a category';


CREATE TRIGGER categories_timestamp_on_modify
    BEFORE INSERT OR UPDATE
    ON public.categories
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_modify();

COMMENT ON TRIGGER categories_timestamp_on_modify ON public.categories
    IS 'Date and time of modification of a category';


CREATE TRIGGER articles_timestamp_on_create
    BEFORE INSERT
    ON public.articles
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_create();

COMMENT ON TRIGGER articles_timestamp_on_create ON public.articles
    IS 'Date and time of creation of an article post';


CREATE TRIGGER articles_timestamp_on_modify
    BEFORE INSERT OR UPDATE
    ON public.articles
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_modify();

COMMENT ON TRIGGER articles_timestamp_on_modify ON public.articles
    IS 'Date and time of modification of an article post';


CREATE TRIGGER gifs_timestamp_on_create
    BEFORE INSERT
    ON public.gifs
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_create();

COMMENT ON TRIGGER gifs_timestamp_on_create ON public.gifs
    IS 'Date and time of creation of a GIF post';


CREATE TRIGGER gifs_timestamp_on_modify
    BEFORE INSERT OR UPDATE
    ON public.gifs
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_modify();

COMMENT ON TRIGGER gifs_timestamp_on_modify ON public.gifs
    IS 'Date and time of modification of a GIF post';


CREATE TRIGGER article_comments_timestamp_on_create
    BEFORE INSERT
    ON public.article_comments
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_create();

COMMENT ON TRIGGER article_comments_timestamp_on_create ON public.article_comments
    IS 'Date and time of creation of a comment on an article post';


CREATE TRIGGER article_comments_timestamp_on_modify
    BEFORE INSERT OR UPDATE
    ON public.article_comments
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_modify();

COMMENT ON TRIGGER article_comments_timestamp_on_modify ON public.article_comments
    IS 'Date and time of modification of a comment on an article post';


CREATE TRIGGER gif_comments_timestamp_on_create
    BEFORE INSERT
    ON public.gif_comments
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_create();

COMMENT ON TRIGGER gif_comments_timestamp_on_create ON public.gif_comments
    IS 'Date and time of creation of a comment on a GIF post';


CREATE TRIGGER gif_comments_timestamp_on_modify
    BEFORE INSERT OR UPDATE
    ON public.gif_comments
    FOR EACH ROW
    EXECUTE PROCEDURE public.timestamp_on_modify();

COMMENT ON TRIGGER gif_comments_timestamp_on_modify ON public.gif_comments
    IS 'Date and time of modification of a comment on a GIF post';

