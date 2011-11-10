/**
 * A jQuery extension to handle form errors. Takes JSON encoded data
 * and outputs a more or less sanitized error notice for the form field.
 */
if (jQuery) (function($) {
    $.errorHandler = function(err, form) {
        err = (err == undefined || err == '') ? {} : err;
        for (var name in err) {
            var message = err[name];
            var $field = form && form.length ? $('#' + form).find('#' + name) : $('#' + name);
            if (!$field.length) $field = form && form.length ? $('#' + form).find('*[name=' + name + ']') : $('*[name=' + name + ']');
            if ($field.length) {
                $field.addClass('error');
                var placement = $field.data('placement');
                if (placement) {
                    if (placement == 'appendForm') {
                        $field.closest('form').append('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement == 'prependForm') {
                        $field.closest('form').prepend('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement == 'appendSiblingLabel') {
                        $field.siblings('label').append('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement == 'prependSiblingLabel') {
                        $field.siblings('label').prepend('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement == 'appendParent') {
                        $field.parent().append('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement == 'prependParent') {
                        $field.parent().prepend('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement == 'before') {
                        $field.before('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement == 'after') {
                        $field.after('<span class="error"><span>' + message + '</span></span>');
                    }
                } else {
                    $field.after('<span class="error"><span>' + message + '</span></span>');
                }
            }
        }
    }

    // remove error box on focus
    $('form .error').live('focus', function() {
        $(this).removeClass('error');
    });
})(jQuery);
