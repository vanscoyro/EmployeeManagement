USE department_db;

SET FOREIGN_KEY_CHECKS=0;

INSERT INTO departments (name)
VALUES
    ('Support'),
    ('Hosting'),
    ('Training'),
    ('Programming');
INSERT INTO role (title,salary,department_id)
VALUES 
    
    ('Level 1 Tech', 30000,1),
    ('Level 2 Tech', 40000,1),
    ('Tech Lead', 70000, 1),
    ('Hosting Staff', 60000,2),
    ('Basic Trainer', 40000,3),
    ('Master Trainer', 50000,3),
    ('Developer Level 1',70000,4),
    ('Developer Level 2', 80000,4),
    ('Senior Developer', 100000,4);
    

INSERT INTO employees (first_name,last_name,role_id,manager_id)
VALUES 
    ('Walter','White',3,null),
    ('Robert','VanScoy',1,1),
    ('Johnny','Sins',2,1),
    ('Scooby','Doo',4,1),
    ('Bob','Dole',6,null),
    ('Texas','Red',5,5),
    ('Huegh', 'Heffner',9,null),
    ('Chris','Newbie',7,7),
    ('Angel','GettinThereJr',8,7);
