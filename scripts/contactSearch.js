$(function () {
    const contactListPage = $("#contact_list"),
        tableBody = $("#contact_list table tbody");

    // Search Contact
    contactListPage.on('keyup', '#contact_list_search', function () {
        const text = this.value;

        $.ajax({
            type: 'POST',
            url: CONFIGS.api_url + "/contacts/search",
            contentType: "application/json",
            dataType: 'json',
            data: text,
            success: function (result) {

                if (result.status !== 'success') {

                    //TODO Show Error Message
                    return;
                }

                tableBody.empty();

                $.each(result.data, function (key, value) {
                    generateContactList(value);
                });
            }
        })
    });
});
