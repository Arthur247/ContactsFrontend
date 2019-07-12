function getContactList() {

    const tableBody = $("#contact_list table tbody"),
        searchField = $('#contact_list_search');

    $.ajax({
        type: 'POST',
        url: CONFIGS.api_url + "/contacts/getList",
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {

            if (result.status !== 'success') {

                //TODO Show Error Message
                return;
            }

            tableBody.empty();
            searchField.val('');

            $.each(result.data, function (key, value) {
                generateContactList(value);
            });
        }
    })
}

function generateContactList(value) {

    const tableBody = $("#contact_list table tbody"),
        phone_numbers = JSON.parse(value.phone_numbers);

    let element = $('<td></td>');

    $.each(phone_numbers, function (key, value) {
        element.append(
            $('<input>')
                .addClass('form-control')
                .attr('id', key)
                .attr('type', 'text')
                .val(value)
        );
    });

    element.append(
        $('<button></button>')
            .addClass('btn btn-default btn-sm pull-right')
            .attr('type', 'button')
            .text('Add Number')
            .attr('id', value.id)
            .addClass('contact_list_add_number')
    );

    tableBody.append(
        $('<tr></tr>')
            .attr('id', value.id)
            .append(
                $('<td></td>').text(value.first_name + ' ' + value.last_name),
                $('<td></td>').append(element),
                $('<td></td>').append(
                    $('<button></button>')
                        .addClass('edit_btn btn btn-info')
                        .attr('type', 'button')
                        .attr('id', value.id)
                        .text('Edit'),
                    $('<button></button>')
                        .addClass('delete_btn btn btn-danger')
                        .attr('type', 'button')
                        .attr('id', value.id)
                        .text('X')
                )
            )
    )
}

function resetContactForm() {

    const form = $("#contact_form"),
        phoneNumbers = $("#contact_phone_numbers"),
        phoneNumber = $("#contact_phone_number");

    form[0].reset();
    form.removeAttr('data-action');
    form.removeAttr('data-contact_id');
    phoneNumbers.find('.custom_created').remove();
    phoneNumber.attr('name', 'phone_number_');
}