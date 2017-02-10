var login
var pass

$(document).ready(function() {
    $('#pass, #confirmPasswordInput').on('keyup', function(e) {

        if ($('#pass').val() != '' && $('#confirmPasswordInput').val() != '' && $('#pass').val() != $('#confirmPasswordInput').val()) {
            $('#passwordStrength').html('Vos mots de passe ne correspondent pas');

            return false;
        }

        // Must have capital letter, numbers and lowercase letters
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");

        // Must have either capitals and lowercase letters or lowercase and numbers
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");

        // Must be at least 6 characters long
        var okRegex = new RegExp("(?=.{8,}).*", "g");

        if (okRegex.test($(this).val()) === false) {
            // If ok regex doesn't match the password
            $('#passwordStrength').removeClass().addClass('alert alert-error').html('Votre mot de passe doit comporter 8 caractères');

        } else if (strongRegex.test($(this).val())) {
            // If reg ex matches strong password
            $('#passwordStrength').removeClass().addClass('alert alert-success').html('Mot de passe correct !');
        } else if (mediumRegex.test($(this).val())) {
            // If medium password matches the reg ex
            $('#passwordStrength').removeClass().addClass('alert alert-info').html('Make your password stronger with more capital letters, more numbers and special characters!');
        } else {
            // If password is ok
            $('#passwordStrength').removeClass().addClass('alert alert-error').html('Weak Password, try using numbers and capital letters.');
        }

        return true;
    });

    $('.show-password').click(function() {
        if ($(this).prev('input').prop('type') == 'password') {
            //Si c'est un input type password
            $(this).prev('input').prop('type', 'text');
            $(this).text('cacher');
        } else {
            //Sinon
            $(this).prev('input').prop('type', 'password');
            $(this).text('afficher');
        }
    });

    $(function() {
        $("#ville").autocomplete({
            source: function(request, response) {
                $.getJSON(
                    "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + request.term,
                    function(data) {
                        response(data);
                    }
                );
            },
            minLength: 3,
            select: function(event, ui) {
                var selectedObj = ui.item;
                $("#ville").val(selectedObj.value);
                return false;
            },
        });
        $("#ville").autocomplete("option", "delay", 100);
    });

    $("#login").focusout(function() {
        login = $('#login').val();
        console.log(login);
        localStorage.setItem("login", login);
        console.log(localStorage.login);
    });

    $("#pass").focusout(function() {
        pass = $('#pass').val();
        localStorage.setItem("pass", pass);
        console.log(localStorage.pass);
    });

    // contrôle url
    $('#url').focusout(function() {
        var urlRegex = new RegExp(/^(HTTP|HTTP|http(s)?:\/\/|(www\.))?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/);
        var urlOk = $("#url").val();
        if (urlRegex.test(urlOk) === true) {
            $('#urlOk').removeClass().addClass('alert alert-success').html('Votre url est validée!');
        } else {
            $('#urlOk').removeClass().addClass('alert alert-error').html('Veuillez renseigner une url valide.');
        }
    });

    $('.show-password2').click(function() {
        if ($(this).prev('input').prop('type') == 'password') {
            //Si c'est un input type password
            $(this).prev('input').prop('type', 'text');
            $(this).text('cacher');
        } else {
            //Sinon
            $(this).prev('input').prop('type', 'password');
            $(this).text('afficher');
        }
    });

    // lecture localStorage connexion
    $("#login2").focusout(function() {
        var login2 = $('#login2').val();
        localStorage.getItem("login", login);
        if (login2 == localStorage.getItem("login", login)) {
            console.log("login ok");
        } else {
            console.log("login erroné");
        }
    });

    $("#pass2").focusout(function() {
        var pass2 = $('#pass2').val();
        localStorage.getItem("pass", pass);
        console.log(localStorage.getItem("pass", pass));
        if (pass2 === localStorage.getItem("pass", pass)) {
            console.log("pass ok");
        } else {
            console.log("pass erroné");
        }
    });
});