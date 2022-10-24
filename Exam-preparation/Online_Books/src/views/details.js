import { deleteBook, getBookById } from "../api/books.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (book, isOwner, onDelete) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src="${book.imageUrl}"></p>
            <div class="actions">

                ${isOwner ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a class="button" @click=${onDelete} href="#">Delete</a>`
                        : ''}
                
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>`;

export async function detailsView(ctx) {
    const book = await getBookById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData?.id == book._ownerId; // == 'userData && userData.id == -//-' |if userData exists, it will continue ~ this is used in order to prevent exceptions|

    ctx.render(detailsTemplate(book, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this book?');

        if(choice) {
            await deleteBook(ctx.params.id);
            ctx.page.redirect('/books');
        }
    }
}



//BONUS 
/*<!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                <!-- <a class="button" href="#">Like</a> -->

                <!-- ( for Guests and Users )  -->
                <!-- <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: 0</span>
                </div> -->
                <!-- Bonus -->*/