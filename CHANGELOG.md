# Changes in 5.1.0
- Require latest version of planout

# Changes in 4.1.0
- Now transpile using babel 6 instead of babel 4

# Changes in 3.0.1
- Removed the ```shouldEnroll``` prop. If you want to use conditional enrollment then you should register the experimental input to the experiment you care about and then conditionally unenroll users in your PlanOut experiment definition (see here for more information: https://github.com/HubSpot/PlanOut.js/pull/15)

# Changes in 3.0
- Renamed experimentClass -> Experiment

# Changes in 2.1
- Added the ```parametrize``` function that takes in experiment information and a component and parametrizes the component with the experiment parameters as props.
- Added the requirement to pass in an array of experiment parameters as props to the Parametrize component and removed the experimentName prop.
