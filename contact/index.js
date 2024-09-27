function overwrite_text(elem, tog) {
	return () => {
		// Replace any non-digit character with an empty string
		const regex = new RegExp(`[${tog ? "^" : ""}0-9]`, "g")
		elem.value = elem.value.replace(regex, "")
	}
}
const firstname = document.getElementsByName("namn")[0]
const lastname = document.getElementsByName("lastname")[0]
const number = document.getElementsByName("number")[0]
const form_submit = document.getElementById("form_submit")
firstname.addEventListener("input", overwrite_text(firstname, false))
lastname.addEventListener("input", overwrite_text(lastname, false))
number.addEventListener("input", overwrite_text(number, true))
form_submit.addEventListener("click", () => {
	document.forms[0].action = `mailto:test@example.com?subject=test&body=${encodeURIComponent(
		[...document.forms[0].elements]
			.map((val) => {
				return val.getAttribute("type") === "button"
					? ""
					: `${val.getAttribute("name")}:${val.value}`
			})
			.join("\n")
	)}`
	document.forms[0].requestSubmit()
})
