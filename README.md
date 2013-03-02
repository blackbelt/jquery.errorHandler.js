## About ##

jQuery errorHandler is a plugin which aims to simplify displaying backend validation errors on your form. It's really easy to use. All you have to do is pass it a `json` encoded array of key/val pairs following the format `formField => Error description`.
That's it! If you want to get tricky, you can also specify multiple error handlers for different forms on a page. You can also tell errorHandler where to place your errors!

## Configuration ##

There are really no configuration options. The error handler is triggered via a call to `$.errorHandler({field: 'message'}, 'formId')` where you pass in a key/val pair of form field name and error messages.

The second parameter is optional and is a reference to the form if if one exists. This is necessary if you have multiple forms on the same page so you can target the appropriate one.

Form fields will receive a class of `error`. 

## List of error placements ##

If the form field has a data attribute of `placement`, i.e. `data-placement="appendForm"`, then the error will be appended to that location.

 * `appendForm` - Insert the error message at the beginning of the form.
 * `prependForm` - Insert the error message at the end of the form.
 * `appendSiblingLabel` - Insert the error message at the beginning of the sibling label.
 * `prependSiblingLabel` - Insert the error message at the end of the sibling label.
 * `appendParent` - Insert the error message at the beginning of the form element's parent element.
 * `prependParent` - Insert the error message at the end of the form element's parent element.
 * `before` - Insert the error message before the form element.
 * `after` - Insert the error message after the form element.

By default, errorHandler will use `after` if no placement data attribute is supplied.

## Example Usage ##

### Below is strictly a JS example ###

```html
<form method="post" action="/" id="login-form">
    <label for="username">Username</label>
    <input type="text" name="username" id="username" data-placement="after" />

    <label for="password">Password</label>
    <input type="text" name="password" id="password" data-placement="after" />

    <button type="submit">Login</button>
</form>

<script type="text/javascript" src="/js/jquery.errorhandler.js"></script>
<script type="text/javascript">
var formErr = {
    username: 'You must enter a username',
    password: 'You must enter a password'
};

$.errorHandler(formErr, 'login-form');
</script>
```

### Below is example usage via PHP errors ###


```php
<form method="post" action="/" id="login-form">
    <label for="username">Username</label>
    <input type="text" name="username" id="username" data-placement="after" />

    <label for="password">Password</label>
    <input type="text" name="password" id="password" data-placement="after" />

    <button type="submit">Login</button>
</form>

<script type="text/javascript" src="/js/jquery.errorhandler.js"></script>
<script type="text/javascript">
var formErr = <?php echo (isset($errors) && is_array($errors)) ? json_encode($this->errors) : '{}'; ?>;
$.errorHandler(formErr, 'login-form');
</script>
```
