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

INSERT INTO networth (userId, year, month, day, accountInstitution, accountName, accountBalance, isAsset, isRetirement, isInvestment, isHome) 
VALUES 
(1234, 2020, 06, 25, 'retire', 'testing', 20, true, true, false, false),
(1234, 2020, 06, 25, 'retire', 'testing', 10, true, true, false, false),
(1234, 2020, 06, 25, 'cash-', 'testing', 10.10, false, false, false, false),
(1234, 2020, 06, 25, 'cash', 'testing', 12.75, true, false, false, false),
(1234, 2020, 06, 25, 'invest', 'testing', 15, true, false, true, false),
(1234, 2020, 06, 25, 'home', 'testing', 2000, true, false, false, true),
(1234, 2020, 06, 24, 'home-', 'testing', 6000, false, false, false, true),
(1234, 2020, 06, 24, 'home', 'testing', 16000, true, false, false, true),
(1234, 2020, 06, 24, 'retire', 'testing', 200, true, true, false, false),
(1234, 2020, 06, 24, 'cash-', 'testing', 15, false, false, false, false),
(1234, 2020, 06, 24, 'invest', 'testing', 1.50, true, false, true, false),
(1234, 2020, 06, 24, 'cash', 'testing', 40, true, false, false, false);