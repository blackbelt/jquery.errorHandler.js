/**
 * A jQuery extension to handle form errors. Takes JSON encoded data
 * and outputs a more or less sanitized error notice for the form field.
 */
if (jQuery) (function($) {
    $.errorHandler = function(err, form) {
        var message,
            $field,
            placement,
            fld;
            
        err = (err == undefined || err == '') ? {} : err;
        for (var name in err) {
            message = $.errorHandler.message.replace('{message}', err[name]);
            $field = form && form.length ? $('#' + form).find('#' + name) : $('#' + name);
            if (!$field.length) {
                $field = form && form.length ? $('#' + form).find('*[name=' + name + ']') : $('*[name=' + name + ']');
            }
            
            if (!$field.length) {
                continue;
            }
            
            $field.addClass('error');
            placement = $field.data('placement');
            if (!placement) {
                $field.after(message);
                continue;
            }
            
            if (placement.indexOf('appendClosest') > -1) {
                fld = placement.match(/appendClosest\(([a-zA-Z0-9_\-.#]+)\)/);
                if (fld && fld.length) {
                    $field.closest(fld[1]).append(message);
                } else {
                    $field.parent().append(message);
                }
            } else if (placement.indexOf('prependClosest') > -1) {
                fld = placement.match(/prependClosest\(([a-zA-Z0-9_\-.#]+)\)/);
                if (fld && fld.length) {
                    $field.closest(fld[1]).prepend(message);
                } else {
                    $field.parent().prepend(message);
                }
            } else if (placement == 'appendForm') {
                $field.closest('form').append(message);
            } else if (placement == 'prependForm') {
                $field.closest('form').prepend(message);
            } else if (placement == 'appendSiblingLabel') {
                $field.siblings('label').append(message);
            } else if (placement == 'prependSiblingLabel') {
                $field.siblings('label').prepend(message);
            } else if (placement.indexOf('appendParent') > -1) {
                fld = placement.match(/appendParent\(([a-zA-Z0-9_\-.#]+)\)/);
                if (fld && fld.length) {
                    $field.parent(fld[1]).append(message);
                } else {
                    $field.parent().append(message);
                }
            } else if (placement.indexOf('prependParent') > -1) {
                fld = placement.match(/prependParent\(([a-zA-Z0-9_\-.#]+)\)/);
                if (fld && fld.length) {
                    $field.parent(fld[1]).prepend(message);
                } else {
                    $field.parent().prepend(message);
                }
            } else if (placement == 'before') {
                $field.before(message);
            } else if (placement == 'after') {
                $field.after(message);
            }
        }
    };
    
    // allow for overriding of error format
    $.errorHandler.format = '<span class="error"><span>{message}</span></span>';

    // remove error box on focus
    $('form .error').live('focus', function() {
        $(this).removeClass('error');
    });
})(jQuery);
