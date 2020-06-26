use Employee_Tracker;

insert into department  (name) values ("Education");


insert into role  (title, salary, department_id) values
 ("Student",2.0, 1),
 ("Instructor", 50.0, 1);
 
 


 insert into employee  (first_name, last_name, manager_id, role_id) values
 ("Fred", "Jenkins",null, 1);