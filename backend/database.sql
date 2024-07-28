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


