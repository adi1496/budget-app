const addPopupPlaceholder = `<div class="dark-screen" id="dark-screen-popup">
<div class="container-add-new">
    <h4 class="heading-4">Add New {%type%}</h4>
    <div class="input-box">
        <div class="input-box-placeholder">You can write also a mathematic expression here</div>
        <div class="input-value-expression" id="input-value" contenteditable></div>
        <svg class="backspace">
            <use xlink:href="img/svg/icons.svg#icon-backspace"></use>
        </svg>
    </div>

    <div class="categories-list">
        <label class="category-item" for="salary">
            <input type="radio" class="radio-btn" id="salary" name="category-item">
            <svg class="category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
            </svg>
            <div class="category-description">Salary</div>
        </label>
        <label class="category-item" for="project">
            <input type="radio" class="radio-btn" id="project" name="category-item">
            <svg class="category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
            </svg>
            <div class="category-description">Project</div>
        </label>
        <label class="category-item" for="transferta">
            <input type="radio" class="radio-btn" id="transferta" name="category-item">
            <svg class="category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
            </svg>
            <div class="category-description">Transferta</div>
        </label>
        <label class="category-item" for="dividend">
            <input type="radio" class="radio-btn" id="dividend" name="category-item">
            <svg class="category-icon">
                <use xlink:href="img/svg/category-icons.svg#icon-coin-euro"></use>
            </svg>
            <div class="category-description">Dividend</div>
        </label>
    </div>

    <div class="description-box">
        <div class="description-box-placeholder">Type a note</div>
        <div class="input-description-div" id="input-description" contenteditable></div>
    </div>

    <div class="buttons">
        <button class="new-btn" id="cancel-popup-btn">Cancel</button>
        <button class="new-btn {%class-btn%}" data-type="{%add-type%}" id="submit-btn">Add New {%type%}</button>
    </div>

</div>
</div>`;


const itemPlaceholder = `<li id="list-item" data-id="{%id%}" data-type="{%type%}" class="item">
    <div class="item-name">{%name%}</div>
    <div class="item-description">{%description%}</div>
    <div class="item-value {%class-color%}">{%value%}{%percent-placeholder%}</div>
    <div class="item-options">
    <div class="item-edit" id="item-edit">
        <svg class="item-icon item-icon-edit">
            <use xlink:href="img/svg/icons.svg#icon-pencil"></use>
        </svg>
    </div>
    <div class="item-delete" id="item-delete">
        <svg class="item-icon item-icon-delete">
            <use xlink:href="img/svg/icons.svg#icon-cancel-circle"></use>
        </svg>
    </div>
    </div>
</li>`;



const percentPlaceholder = `<span class="item-percent" id="item-percent">{%percent%}</span>`;

const placeholders = {
    addPopupPlaceholder: addPopupPlaceholder,
    itemPlaceholder: itemPlaceholder,
    percentPlaceholder: percentPlaceholder
}

export default placeholders;