react-experiments
====================

react-experiments is a Javascript library that assists in defining and managing UI experiments in React.

# Installation

```
npm install react-experiments
```

# Usage

react-experiments was built to work with [PlanOut.js](https://www.github.com/HubSpot/PlanOut.js) and most of the constructs in it are inspired by the structure of PlanOut.js. This library will work out of the box if you pass it an instantiated PlanOut Namespace or Experiment class, but if you want to use your own methods of assigning experiment parameters and logging exposure then you can extend the base [experiment class](https://github.com/HubSpot/react-experiments/blob/master/src/experimentClass.js) and pass that as the experiment prop to the Experiment class components.


## Implementing an experiment

This library serves as a way to declaratively implement UI experiments that are defined via PlanOut. The standard usage of this library is as follows:

1) Define experiment via PlanOut script / API. The PlanOut parameters that you set should map to the props that you  want to run an experiment on. Let's use the [sample PlanOut.js experiment](https://github.com/HubSpot/PlanOut.js/blob/master/examples/sample_planout_es5.js#L41) as an example, which is effectively: 

```
signupText = uniformChoice(choices=['Signup', 'Join now'])
```

2) Wrap the component where you want to implement your UI experiment with the Parametrize component provided by the library. As an example,

```
<Parametrize experiment={DummyExperiment} experimentName='SampleExperiment'>
  <Signup />
</Parametrize>

3) Suppose your Signup component looks something like this:
```javascript
  render() {
    return (
      <div>
        {this.props.signupText}
      </div>
    );
  }
```

Now, you can just use the ```WithExperimentParams``` component provided by the library and wrap the Signup component with it.
```
Signup = withExperimentParams(Signup);
```

Now you should be all set to run the sample experiment and the Signup component will render 'Sign up' or 'Join now' based on the randomized parameter assigned by PlanOut.js.

To put it all together,

```javascript
let Signup = React.createClass({
  render() {
    return (
      <div>
        {this.props.signupText}
      </div>
    );
  }
});

Signup = withExperimentParams(Signup);
exp = new DummyExperiment({ id: 'this_is_the_user_id'});

let Parent = React.createClass({
  render() {
    ...
    <Parametrize experiment={exp} experimentName='SampleExperiment'>
      <Signup />
    </Parametrize>
  }
});
```

###Parametrize component

The following are the props for the Parametrize component:

experiment: This is an instance of a PlanOut.js experiment / namespace class or the base experimentClass. [REQUIRED]

experimentName: This is the name of the experiment. It is particularly important if you're using a PlanOut.js namespace since this corresponds to the name of the experiment WITHIN the namespace, not the name of the namespace itself. This is required so that exposure gets logged correctly. [REQUIRED]

[any arbitrary prop]: You can pass arbitrary props to the Parametrize component and they will be available via context.experimentProps in all descendants of the Parametrize component.


### ABTest component:

There are two common types of experimental parameters:

1) Parameters that correspond to parametrizations of existing variables and components. For instance, if one is running an experiment to test which shade of blue optimizes the click rate of the button then the the values that your experiment parameters map to would correspond something such as the different hex codes for the different shades of blue.

2) "Branching" parameters where the parameter values correspond to different "variations" of the experiment. For instance, if one is testing two completely different user interfaces then it wouldn't make sense to parametrize every aspect that has changed but rather to bin users into either 'Variation A' or 'Variation B'.

While the core component of this library focuses on the first type of parameters, it also includes some convenience components built around the Parametrize component for running "branching" experiments.

```javascript
<ABTest on='foo' experiment={TestNamespace} experimentName='SimpleExperiment' shouldEnroll={this.shouldEnroll()}>
  <When value='foobar'>
    variation 1
  </When>
  <When value='bar'>
    variation 2
  </When>
  <When value='test'>
    variation 3
  </When>
  <Default>
    variation default
  </Default>
</ABTest>
```

The ABTest component above branches off the value of ```this.props.experiment.get(this.props.on);```, ```TestNamespace.get('foo')``` in this case, and renders the When component where ```ABTest.props.experiment.get(ABTest.props.on) === ABTest.props.value```. If it doesn't find a corresponding When component to render then the Default component will render. This component makes it easy to implement an experiment using "branching" parameters.

The ABTest component takes the following as props:

1) experiment - an instantiated PlanOut namespace or experiment class or a custom experimentClass. [REQUIRED]

2) on - the parameter name to "branch" off [REQUIRED]

3) experimentName - the name of the experiment that the component corresponds with. This is particularly important if you are passing in a namespace class. If you are passing in a namespace class then experimentName should correspond to the name of the experiment within the namespace that this component should handle. Use this if you want your component to deal with any arbitrary number of parameters. [REQUIRED]

4) shouldEnroll - this determines whether or not the user should be enrolled in the experiment or not. It defauls to true. If false is passed in nothing is returned and no exposure is logged. [OPTIONAL]

## Customized Experiment Components

If you want to create your own experiment component you can extend the base Parametrize component.

## Logging

react-experiments logs an exposure event when it determines that a user should be enrolled in an experiment (i.e. the shouldEnroll prop is not false). 

## Development

This project is written using ES6 and all build steps / transpilation are done by webpack. Be sure to run ```npm install``` to install the necessary development dependencies. In order to develop and test locally, it is necessary to simply run the ```build.sh``` shell script which will take care of transpiling to ES5 and running tests.

To test API changes locally, open the examples/index.html file locally after building with your most recent changes. The index.html file contains a simple example of using this library paired with the [PlanOut.js sample experiment](https://github.com/HubSpot/PlanOut.js/blob/master/examples/sample_planout_es5.js).

Please be sure to add tests to this project when making changes. This project uses [Jest](https://facebook.github.io/jest/) for running tests. Tests can be run either by building the project using build.sh or by using ```npm test```.

