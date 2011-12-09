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
                    if (placement.indexOf('appendClosest') > -1) {
                        var fld = placement.match(/appendClosest\(([a-zA-Z0-9_\-.#]+)\)/);
                        if (fld && fld.length) {
                            $field.closest(fld[1]).append('<span class="error"><span>' + message + '</span></span>');
                        } else {
                            $field.parent().append('<span class="error"><span>' + message + '</span></span>');
                        }
                    } else if (placement.indexOf('prependClosest') > -1) {
                        var fld = placement.match(/prependClosest\(([a-zA-Z0-9_\-.#]+)\)/);
                        if (fld && fld.length) {
                            $field.closest(fld[1]).prepend('<span class="error"><span>' + message + '</span></span>');
                        } else {
                            $field.parent().prepend('<span class="error"><span>' + message + '</span></span>');
                        }
                    } else if (placement == 'appendForm') {
                        $field.closest('form').append('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement == 'prependForm') {
                        $field.closest('form').prepend('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement == 'appendSiblingLabel') {
                        $field.siblings('label').append('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement == 'prependSiblingLabel') {
                        $field.siblings('label').prepend('<span class="error"><span>' + message + '</span></span>');
                    } else if (placement.indexOf('appendParent') > -1) {
                        var fld = placement.match(/appendParent\(([a-zA-Z0-9_\-.#]+)\)/);
                        if (fld && fld.length) {
                            $field.parent(fld[1]).append('<span class="error"><span>' + message + '</span></span>');
                        } else {
                            $field.parent().append('<span class="error"><span>' + message + '</span></span>');
                        }
                    } else if (placement.indexOf('prependParent') > -1) {
                        var fld = placement.match(/prependParent\(([a-zA-Z0-9_\-.#]+)\)/);
                        if (fld && fld.length) {
                            $field.parent(fld[1]).prepend('<span class="error"><span>' + message + '</span></span>');
                        } else {
                            $field.parent().prepend('<span class="error"><span>' + message + '</span></span>');
                        }
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
