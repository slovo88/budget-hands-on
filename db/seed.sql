USE budget;


INSERT INTO transactions (userId, year, month, day, category, amount, description, note) 
VALUES 
(1234, 2020, 6, 15, 'Vacations', 23.74, 'Drinks in Vegas', 'Made by a robot!'),
(1234, 2020, 5, 30, 'Home', 250, 'Duke Energy', 'High electric bill');


INSERT INTO pools (userId, pool, year, category, target) 
VALUES 
(1234, 'monthly', 2020, 'Home', 24000),
(1234, 'monthly', 2020, 'Vehicle', 1440),
(1234, 'monthly', 2020, 'Phone', 960),
(1234, 'monthly', 2020, 'Food', 3600),
(1234, 'monthly', 2020, 'Discretionary', 6000),
(1234, 'annual', 2020, 'Annual expenses', 885),
(1234, 'annual', 2020, 'Vacations', 6000),
(1234, 'annual', 2020, 'Master bathroom renovation', 16000),
(1234, 'annual', 2020, '2020 IRA', 6000),
(1234, 'annual', 2020, '2021 IRA', 6000),
(1234, 'annual', 2020, 'Exercise room setup', 7000),
(1234, 'annual', 2020, 'Misc spending (furniture, gifts)', 3000);