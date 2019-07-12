$(function () {

    const contactListPage = $("#contact_list"),
        contactPage = $("#contact"),
        addNumberButton = $("#contact_add_phone_number"),
        form = $("#contact form");

    getContactList();

    // To Create Contact
    contactListPage.on('click', '#contact_create_btn', function () {
        form.attr('data-action', 'create');
        contactListPage.hide();
        contactPage.show();
    });

    // To Edit Contact
    contactListPage.on('click', '.edit_btn', function () {
        const contact_id = this.id;

        $.ajax({
            type: 'POST',
            url: CONFIGS.api_url + "/contacts/view/" + contact_id,
            contentType: "application/json",
            dataType: 'json',
            success: function (result) {

                if (result.status !== 'success') {

                    //TODO Show Error Message
                    return;
                }

                form.attr('data-action', 'update');
                form.attr('data-contact_id', contact_id);

                contactListPage.hide();
                contactPage.show();

                $.each(result.data, function (key, value) {

                    $("#contact form input[name=" + key + "]").val(value);

                    if (key.toString() === 'phone_numbers') {

                        let phone_number_count = 1;

                        $.each(JSON.parse(value), function (phone_number_key, phone_number_value) {

                            if (phone_number_count !== 1) {
                                addNumberButton.before(
                                    $('<input>')
                                        .addClass('form-control custom_created')
                                        .attr('type', 'text')
                                        .attr('name', 'phone_number_' + phone_number_key)
                                        .val(phone_number_value)
                                );
                            } else {
                                $("#contact form input[name=phone_number_]")
                                    .val(phone_number_value)
                                    .attr('name', 'phone_number_' + phone_number_key)
                            }
                            phone_number_count++;
                        });
                    }
                });
            }
        })
    });

    // Delete Contact
    contactListPage.on('click', '.delete_btn', function () {
        const contact_id = this.id;

        $.ajax({
            type: 'POST',
            url: CONFIGS.api_url + "/contacts/delete/" + contact_id,
            contentType: "application/json",
            dataType: 'json',
            success: function (result) {

                if (result.status !== 'success') {

                    //TODO Show Error Message
                    return;
                }

                $("#contact_list table tbody tr#" + contact_id + "").remove();
                //TODO Show Success Message
            }
        })
    });
});