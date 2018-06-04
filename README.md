# EasyCal
__EasyCal__ is a modern calorie counting app that makes nutrition tracking easy: _<http://easycal.io>_

![EasyCal Home Page](/README/todays-log.png "EasyCal Home Page")

If you'd like to start counting your calories and tracking your exercise, you can register an account with just an email address and password!  To take it for a test run, try these login credentials:

__Email Address:__ easycal@test.com

__Password__: easycal

---

[__Technology__](#technology)

[__Libraries Used__](#libraries-used)

[__Features__](#features)

[__Component Hierarchy__](#component-hierarchy)

[__Deployment__](#deployment)

---

## Technology
The frontend of EasyCal is built using React with React Router.  I'm most familiar with Java as a backend language, so all REST endpoints use Play! 1.4.4, a Java-powered MVC web framework.  For details on the data models and implementations, visit the backend repo [here](https://github.com/mileshenrichs/easycal-backend).  All food and nutrition data comes from the [USDA Food Composition Databases](https://ndb.nal.usda.gov/ndb/doc/index).

## Libraries Used
* __[immutability-helper](https://www.npmjs.com/package/immutability-helper):__ Immutability helper's `update()` function made nested state objects easy to update without mutation
* __[react-day-picker](https://www.npmjs.com/package/react-day-picker):__ React Day Picker provided a ready-to-use date selection utility to navigate daily logs and set specific date ranges for which to view statistics
* __[moment.js](https://www.npmjs.com/package/moment):__ Moment's helpful date utilities came in handy for setting and displaying dates on the Stats page
* __[react-highcharts](https://www.npmjs.com/package/react-highcharts):__ React Highcharts allowed for rendering and updating of a [Highcharts](https://www.highcharts.com/)-powered food & exercise graph on the Stats page
* __[qs](https://www.npmjs.com/package/qs):__ qs allowed for parsing of query strings throughout the application
* __[react-favicon](https://www.npmjs.com/package/react-favicon):__ For whatever reason, I was having trouble getting my `favicon.ico` file in `/public` to show up, but react-favicon did the trick

## Features
* Search for food through the USDA Food Composition Databases
* Add foods to your daily log, differentiated by meal (breakfast, lunch, dinner, snacks)
* Easily find frequent foods by browsing __recent foods__ list
* Create custom foods
* View food log for any day of your choosing using the date navigator on the home page
* Modify serving sizes of foods in your log
* Remove foods from your log
* Enter calories burned from exercise each day
* Set daily calorie and nutrient goals, see progress towards those goals in the daily log
* View nutrition breakdowns for any date range: total and average macro __and__ micro nutrients
* See a graph of food consumption and exercise over time

## Component Hierarchy

### DayView: home screen, daily food log
__DayView__ is the home page of EasyCal.  It's where you view the foods you've eaten throughout the day, and input your exercise.
Contains components:
* __DaySelect__: choose which day to view food log of, implements _react-day-picker_
* __Calotron__: display net calories for given day (`caloriesEaten - caloriesBurned`)
* __MealGroup:__ list/table of foods eaten for a given meal (contains __MealItem__, __AddFoodItem__, and __MealTotalsRow__)
* __ActivityInput__: input calories burned from exercise
* __NetCalories__: show equation that calculates day's net calories
* __MacroTotals__: show the day's macronutrient intake and how close each is to user's goal

### AddFoodView: search foods, select serving size, add to log
__AddFoodView__ allows users to search for foods, view recent foods, and create new foods to add to their daily log.
Contains components: 
* __SearchFood__: search bar allowing access to USDA foods database
* __FoodsPanel__: tabs to navigate between __SearchResults__, __RecentFoods__, and __MyFoods__ components (each of which contains __AddableFoodItem__ components)
* __CreateFoodView__: not technically contained by __AddFoodView__, but closely related; provides form through which users and create their own foods with serving size and nutrition information

### StatisticsView: cumulative statistics, calories graph
__StatisticsView__ is a useful way of evaluating your dietary habits over time.  Here, you can view a more detailed breakdown of the foods you eat, including micronutrients like fiber, sugar, and sodium.
Contains components:
* __StatsTable__: day-by-day breakdown of total calories and nutrients (contains __StatsDayItem__)
* __WeekAverages__: table that shows average calories and nutrients during selected date period
* __ExerciseGraph__: Highcharts line graph illustrating calories burned and calories consumed over time

### MyAccountView: set goals, log out
__MyAccountView__ allows users to set & save their calorie and nutrient goals.
Contains components:
* __MyGoals__: form to set/modify user goals

### Utility/Miscellaneous Components
* __LogInView__: log in or register an account; users are redirected here if their login token (a [JSON Web Token](https://jwt.io/)) is absent or invalid
* __Header__: site header, contains logo and navigation
* __Footer__: standard footer, contains logo and nav links
* __AuthLoader__: full-screen loading spinner to hide __DayView__ when app is initally loaded and waiting for authentication results from [backend](https://github.com/mileshenrichs/easycal-backend)

## Deployment
Deployment was a little tricky on both the front- and back-end.  Since `npm run build` creates a static directory, I was able to upload these files to the Namecheap hosting account I purchased with my domain via cPanel's interface.  I had to switch from using `BrowserRouter` to `HashRouter` to prevent my frontend server from looking for directories for each of my routes (i.e. `/stats`, `/add`, etc).