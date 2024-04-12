
function viewToMainMessage(data) {
    var event = new CustomEvent('viewToMainMessage', { detail: data })
    window.parent.document.dispatchEvent(event)
}