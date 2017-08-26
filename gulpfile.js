// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var pug = require( 'gulp-pug' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var data = require( './src/data/' );

// Dynamically add `index` property to each `dish` object.
// Doesn't look like this can be done within the Pug template, so we're doing it here.
data.menuItems = data.menuItems.map( ( menuItem, i ) => {
	menuItem.dishes = menuItem.dishes.map( ( dish, j ) => {
		let sum = data.menuItems
			.slice( 0, i )
			.reduce( ( sum, obj ) => {
				return ( Array.isArray( obj.dishes ) && obj.dishes.length ) ? sum + obj.dishes.length : sum
			}, 0 );

		let curr = sum + ( j + 1 );

		dish.index = ( curr > 9 ) ? '' + curr : '0' + curr;

		return dish;
	} );

	return menuItem;
} );

// --------------------------------------------------
// DEFINE TASKS
// --------------------------------------------------
/**
 * Wrapper around any/all tasks to be executed when `gulp` is run.
 */
gulp.task( 'default', [ 'styles', 'scripts', 'views', 'assets' ] );

/**
 * Wrapper around any/all style-related tasks.
 */
gulp.task( 'styles', function() {
	gulp.src( './src/styles/styles.scss' )
		.pipe( sass( {
			outputStyle: 'expanded',
		} ) )
		.pipe( gulp.dest( './dist/css' ) );
} );

/**
 * Wrapper around any/all script-related tasks.
 */
gulp.task( 'scripts', function() {
	console.log( 'INSIDE TASK: `scripts`' );
} );

/**
 * Wrapper around any/all view-related tasks.
 */
gulp.task( 'views', function() {
	gulp.src( './src/views/*.pug' )
		.pipe( pug( {
			locals: data,
		} ) )
		.pipe( gulp.dest( './dist' ) );
} );


/**
 * Wrapper around any/all asset-related tasks.
 */
 gulp.task( 'assets', function() {
	 gulp.src( './src/assets/**/*' )
	 	.pipe( gulp.dest( './dist/assets/' ) )
 } )
