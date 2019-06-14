# Bench

# Base Idea
To achieve the best result it's better to run the test in a long single while loop taking some time.
In fact, different time could be needed for different tests according to their complexity.

## Determine IterationNumber
To determine IterationNumber test will run

# Minimal test duration
Bench should run a test for as many iterations as it required for run test for a specific time.
As usually each test should be run more than 1000ms.
Running the test multiple times with such amount of iterations gives average ratio in actual duration in about 0.9,
while running.

# minIterations & minTimeSpentInMs
First goal is to determine minimal needed iterations (`minIterations`) per test execution to make test spend `>=minTimeSpentInMs`.

E.g. `Test A` should be executed `10,000` times to spend `>=1000ms`.

Usually, we need `minIterations` to spend `>=1000ms` because there is less actual duration difference on such durations

We can't predict how much iterations needed to execute the test `<1000ms`.

To measure it, just run the test on small number of iterations (to spend `<1000ms`). The difference in actual time could be terrible (max to min duration ratio could be `>1.5`, while with more execution duration it could be lowered to `<1.05`)
