drop database if exists Employee_Tracker;
create database Employee_Tracker;

use Employee_Tracker;
create table department(
id int auto_increment primary key,
name varchar(30) 
);

create table role(
id int auto_increment primary key,
title varchar(30),
salary decimal,
department_id int,
foreign key(department_id) references department(id)
);

create table employee(
id int auto_increment primary key,
first_name varchar(30),
last_name varchar(30),
manager_id int,
foreign key(manager_id) references employee(id),
role_id int,
foreign key(role_id) references role(id)
);

use Employee_Tracker;

insert into department  (name) values ("Education");


insert into role  (title, salary, department_id) values
 ("Student",2.0, 1),
 ("Instructor", 50.0, 1);
 
 
 use Employee_Tracker;

 insert into employee  (first_name, last_name, manager_id, role_id) values
 ("Fred", "Jenkins",null, 1);


 
 

