-- CREATE TABLE if not exists complaint (
--     id SERIAL PRIMARY KEY,
--     name text ,
--     block_id int ,
--     category_id int ,
--     student_id int,
--     assigned_worker_id int,
--     warden_id int,
--     description VARCHAR(40),
--     room VARCHAR(20),
--     is_completed BOOLEAN,
--     created_at timestamp,
--     assigned_at timestamp
-- );

-- create table if NOT EXISTS student (
--     id SERIAL primary key,
--     block_id int,
--     usn varchar(20),
--     first_name varchar(20),
--     last_name varchar(20),
--     password varchar(20),
--     email varchar,
--     phone varchar(10),
--     sr_no varchar(10),
--     grad_year int,
--     room varchar(20)
-- );

-- create table if not EXISTS warden (
--     id serial primary key,
--     name text,
--     password varchar(20),
--     phone varchar(10),
--     email varchar
-- );

-- CREATE table if not EXISTS workers (
--     id serial primary key,
--     category_id int,
--     name text,
--     password varchar(20),
--     phone varchar(10),
--     email varchar
-- ); 

-- CREATE TABLE if not exists users(
--   id serial primary key,
--   full_name VARCHAR(255) NOT NULL,
--   user_email VARCHAR(255) NOT NULL UNIQUE,
--   user_password VARCHAR(255) NOT NULL,
--   type text
-- );


--  new database 

create table if not exists users (
    user_id serial primary key not null,
    full_name text not null,
    email text not null,
    phone text not null,
    password text not null,
    type text not null
);

create table if not exists block (
    block_id serial primary key not null,
    block_name text not null
);

create table if not exists student (
    student_id int primary key not null,
    block_id int,
    usn text ,
    room text,
    foreign key (student_id) references users(user_id) on delete cascade,
    foreign key (block_id) references block(block_id) on delete cascade
);

create table if not exists warden (
    warden_id int primary key not null,
    block_id int,
    foreign key (warden_id) references users(user_id) on delete cascade,
    foreign key (block_id) references block(block_id)
    on delete cascade
);

create table if not exists complaint (
    id SERIAL PRIMARY KEY,
    name text ,
    block_id int,
    student_id int ,
    description text,
    room text,
    is_completed BOOLEAN,
    created_at timestamp,
    assigned_at timestamp,
    foreign key (student_id) references student(student_id) on delete cascade,
    foreign key (block_id) references block(block_id) on delete cascade
);

-- create table if not exists complaint (
--     id SERIAL PRIMARY KEY,
--     name text ,
--     block_id int,
--     category_id int ,
--     student_id int ,
--     assigned_worker_id int,
--     warden_id int ,
--     description text,
--     room text,
--     is_completed BOOLEAN,
--     created_at timestamp,
--     assigned_at timestamp,
--     foreign key (student_id) references student(student_id) on delete cascade,
--     foreign key (block_id) references block(block_id) on delete cascade,
--     foreign key (assigned_worker_id) references workers(worker_id) on delete cascade,
--     foreign key (category_id) references category(category_id) on delete cascade,
--     foreign key (warden_id) references warden(warden_id) on delete cascade
-- );

-- create table if not exists category (
--     category_id serial primary key not null,
--     category_name text
-- );

-- create table if not exists workers (
--     worker_id int primary key not null,
--     category_id int,
--     foreign key (worker_id) references users(user_id) on delete cascade,
--     foreign key (category_id) references category(category_id) on delete cascade
-- );

