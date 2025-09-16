@import url("https://fonts.googleapis.com/css2?family=Bowlby+One+SC&display=swap");
@font-face {
  font-family: graduate;
  src: url("./assets/Graduate-Regular.ttf");
}
@font-face {
  font-family: open-sans;
  src: url("./assets/OpenSans.ttf");
}
nav {
  background-color: #ffffff;
  padding: 0.2rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  height: 2.5rem;
  aspect-ratio: 4/3;
}
.nav-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.logo-section {
  display: flex;
  gap: 0.4rem;
  align-items: flex-end;
}
.logo-section button {
  padding: 0.4rem;
  font-size: 0.75rem;
}

.nav-links {
  display: none;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 1rem;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

.open {
  display: flex;
}

.desktop-navbar {
  display: none;
}

@media (min-width: 800px) {
  nav {
    padding: 0.8rem 0.6rem;
  }
  nav .nav-logo {
    height: 2.7rem;
  }
  .logo-section {
    gap: 0.5rem;
  }
  .logo-section button {
    font-size: 0.85rem;
  }
  .nav-links a {
    font-size: 1.1rem;
  }
}
@media (min-width: 1000px) {
  nav {
    padding: 1rem 1.5rem 1rem 1rem;
  }
  .nav-logo {
    height: 3.3rem;
  }
  .desktop-navbar {
    display: flex;
    width: 30vw;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.1rem;
  }
  .hamburger {
    display: none;
  }
}
.home-mobile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.home-mobile figure {
  width: 100%;
  aspect-ratio: 1/1;
}
.home-mobile figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.home-mobile p {
  font-size: 1.2rem;
}
.home-mobile button {
  margin: 0 auto;
}

.home-desktop {
  display: none;
}

@media (min-width: 800px) {
  .home-mobile figure {
    aspect-ratio: 16/9;
  }
  .home-mobile h1 {
    font-size: 3rem;
  }
  .home-mobile p {
    font-size: 1.4rem;
    font-weight: 450;
  }
  .home-mobile button {
    margin-top: 1rem;
  }
}
@media (min-width: 1000px) {
  .home-mobile {
    display: none;
  }
  .home-desktop {
    display: grid;
    grid-template-columns: 55% 45%;
  }
  .home-desktop .home-desktop-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5rem;
    gap: 2rem;
  }
  .home-desktop .home-desktop-title h1 {
    font-size: 3rem;
  }
  .home-desktop .home-desktop-title p {
    width: 35ch;
    font-size: 1.3rem;
  }
  .home-desktop figure {
    width: 100%;
    aspect-ratio: 1/1;
  }
  .home-desktop figure img {
    object-fit: cover;
  }
}
.services-mobile {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1.2rem;
  margin-bottom: 1rem;
}

.service {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}
.service figure {
  width: 3rem;
  height: 3rem;
}
.service a {
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
}
.service p {
  width: 30ch;
}

.services-desktop {
  display: none;
}

@media (min-width: 800px) {
  .services-mobile {
    padding-bottom: 0rem;
    gap: 1.5rem;
  }
  .services-mobile .service {
    gap: 0;
  }
  .services-mobile .service figure {
    width: 3.8rem;
    height: 3.8rem;
  }
  .services-mobile .service a {
    font-size: 1.3rem;
  }
  .services-mobile .service p {
    font-size: 1.2rem;
  }
}
@media (min-width: 1000px) {
  .services-mobile {
    display: none;
  }
  .services-desktop {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
    padding-bottom: 2.4rem;
  }
  .services-desktop .grid-services {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 2.4rem;
    column-gap: 4rem;
  }
  .services-desktop .service figure {
    width: 4rem;
    height: 4rem;
  }
  .services-desktop .service a {
    font-size: 1.4rem;
  }
  .services-desktop .service p {
    text-align: center;
  }
}
#jobs {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 1rem;
}

.jobs-img img {
  border-radius: 15px;
  object-fit: cover;
}

.text-compo h3 {
  font-size: 1.7rem;
  color: #0f4c61;
}
.text-compo p {
  margin-top: 0.4rem;
  font-size: 1.1rem;
}

.botonera {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: repeat(2, 1fr);
  width: 70%;
  height: 100px;
}
.botonera a {
  border: 1px solid #314044;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.botonera a:nth-child(1) {
  border-left: none;
  border-top: none;
}
.botonera a:nth-child(2) {
  border-top: none;
}
.botonera a:nth-child(3) {
  border-top: none;
  border-right: none;
}
.botonera a:nth-child(4) {
  border-left: none;
  border-bottom: none;
}
.botonera a:nth-child(5) {
  border-bottom: none;
}
.botonera a:nth-child(6) {
  border-bottom: none;
  border-right: none;
}

.more-button {
  width: 2.5rem;
  cursor: pointer;
}

.job-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
}
.job-card figure .job-img {
  width: 100%;
}
.job-card h3 {
  font-size: 1.5rem;
  text-decoration: underline;
}
.job-card section p {
  overflow-wrap: break-word;
}
.job-card input, .job-card textarea {
  font-size: 1.1rem;
}

.pencil-line {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: -0.3rem;
}
.pencil-line figure {
  cursor: pointer;
  width: 1.4rem;
  height: 1.4rem;
}
.pencil-line p {
  margin: 0 0.5rem;
}

.job-date {
  font-size: 1rem;
  font-weight: 750;
  color: #0f4c61;
}

.l {
  text-align: left;
  justify-content: left;
}

.r {
  text-align: right;
  justify-content: right;
  flex-direction: row-reverse;
}

.job-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.job-image {
  position: relative;
}
.job-image button {
  position: absolute;
  top: 0.3rem;
  border-radius: 10px;
  right: 0.3rem;
}

.input-job {
  background-color: inherit;
  outline: none;
  border: 2px solid gray;
  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 100%;
}

.input-job:focus,
.input-job:focus {
  border: orange 2px solid;
}

.edit-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
}
.edit-buttons figure {
  cursor: pointer;
}
.edit-buttons button {
  padding: 0.4rem;
}

.edit-button {
  height: 1.6rem;
}

.form-job form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-job form .field label {
  text-align: left;
  font-size: 1rem;
}
.form-job form .field input,
.form-job form .field textarea,
.form-job form .field select {
  margin-top: 0.3rem;
  width: 100%;
  background-color: inherit;
  padding: 0.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  border: 2px solid gray;
  border-radius: 0.4rem;
  font-family: open-sans;
}
.form-job form .field input:focus,
.form-job form .field textarea:focus {
  border: orange 2px solid;
}

.last-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.moreLessImages {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.category-title {
  font-size: 1.4rem;
  margin-bottom: -0.4rem;
}

@media (min-width: 800px) {
  .jobs-compo {
    width: 75vw;
    margin: 0 auto;
    gap: 1.5rem;
    padding-bottom: 1rem;
  }
  .jobs-img {
    aspect-ratio: 16/9;
    overflow: hidden;
  }
  .jobs-compo h3 {
    font-size: 2.2rem;
  }
  .text-compo h3 {
    font-size: 2rem;
  }
  .text-compo p {
    font-size: 1.2rem;
  }
  .job-card h3 {
    font-size: 1.7rem;
  }
  .job-card p {
    font-size: 1.5rem;
  }
  .more-button {
    width: 3rem;
  }
  .l {
    text-align: center;
    justify-content: center;
  }
  .r {
    text-align: center;
    justify-content: center;
    flex-direction: row-reverse;
  }
  .edit-buttons button {
    padding: 0.5rem;
  }
  .edit-button {
    height: 1.8rem;
  }
  .form-job form {
    width: 55vw;
  }
  .form-job form .field label {
    font-size: 1.3rem;
  }
  .form-job form .field input, .form-job form .field textarea {
    font-size: 1rem;
  }
  .category-title {
    font-size: 1.6rem;
    margin-bottom: -1rem;
  }
}
@media (min-width: 1000px) {
  .jobs-compo {
    width: 60vw;
    margin: 0 auto;
    padding-top: 1rem;
    gap: 2.3rem;
    padding-bottom: 2rem;
  }
  .jobs-compo h2 {
    margin-bottom: -1rem;
  }
  .jobs-compo .botonera {
    width: 90%;
    font-size: 1rem;
  }
  .l {
    text-align: left;
    justify-content: left;
  }
  .r {
    text-align: right;
    justify-content: right;
    flex-direction: row;
  }
  .jobs-img {
    aspect-ratio: 16/9;
    width: 55vw;
    overflow: hidden;
  }
  .job-card {
    gap: 0.4rem;
  }
  .job-card section p {
    font-size: 1.3rem;
  }
  .text-compo h3 {
    font-size: 2.2rem;
  }
  .text-compo p {
    font-size: 1.3rem;
  }
  .job-card h3 {
    font-size: 2.2rem;
  }
  .job-card p {
    font-size: 1.4rem;
  }
  .edit-buttons button {
    padding: 0.6rem;
  }
  .edit-button {
    height: 2.2rem;
  }
  .form-job form {
    width: 40vw;
  }
  .form-job form .field label {
    font-size: 1.4rem;
  }
  .form-job form .field input, .form-job form .field textarea {
    font-size: 1rem;
  }
}
#gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding-bottom: 1rem;
}
#gallery h3 {
  font-size: 1.7rem;
  color: #0f4c61;
}
#gallery .image-card {
  width: 100%;
}
#gallery .image-card figure {
  width: 100%;
}
#gallery .image-card figure img {
  border-radius: 10px;
}
#gallery .gallery-image {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
#gallery .gallery-image .gallery-edit-button {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 0.4rem;
  top: 0.5rem;
  right: 0.5rem;
}
#gallery .gallery-image .gallery-edit-button figure {
  margin-right: 1rem;
  cursor: pointer;
  width: 1.9rem;
  background-color: #fbf7ef;
  border-radius: 12px;
  padding: 0.2rem;
}
#gallery .gallery-image .gallery-edit-button figure img {
  display: block;
}
#gallery .gallery-image .gallery-edit-button button {
  border-radius: 6px;
  padding: 0.5rem;
}
#gallery .more-button {
  width: 2.5rem;
}
#gallery .form-job {
  text-align: center;
}

@media (min-width: 800px) {
  .gallery-compo {
    width: 70vw;
    min-height: 65vh;
    margin: 0 auto;
    padding-bottom: 1rem;
  }
  .gallery-compo h3 {
    font-size: 1.9rem;
  }
  .gallery-compo .form-job {
    margin-bottom: 1rem;
  }
  .gallery-compo .more-button {
    width: 2.5rem;
  }
}
@media (min-width: 1000px) {
  .gallery-compo {
    width: 55vw;
    gap: 1rem;
    min-height: 70vh;
    margin: 0rem auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  .gallery-compo h3 {
    font-size: 2.2rem;
  }
}
.estimate-compo {
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}
.estimate-compo form {
  display: flex;
  flex-direction: column;
  width: 75vw;
  gap: 0.5rem;
}

.field label {
  font-weight: 700;
}
.field input,
.field textarea {
  margin-top: 0.3rem;
  border: 2px solid gray;
  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;
  font-family: open-sans;
  background-color: inherit;
  outline: none;
}
.field input:focus,
.field textarea:focus {
  border: orange 2px solid;
}

.estimate-button {
  margin: 0 auto;
  height: 2.5rem;
  display: flex;
  align-items: center;
}
.estimate-button button {
  font-size: 1rem;
}
.estimate-button p {
  font-size: 1.4rem;
}

@media (min-width: 800px) {
  .estimate-compo form {
    width: 50vw;
  }
}
@media (min-width: 1000px) {
  .estimate-compo {
    padding-bottom: 2rem;
  }
  .estimate-compo h2 {
    margin-top: 1rem;
  }
  .estimate-compo form {
    width: 30vw;
    gap: 0.6rem;
  }
}
.location-compo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 1rem;
  width: 85vw;
  padding-bottom: 1rem;
}
.location-compo .map-image {
  width: 40vw;
}
.location-compo .map-image img {
  border: 1px solid grey;
  border-radius: 11px;
}
.location-compo p {
  margin-top: -0.5rem;
  font-weight: 4500;
}
.location-compo .google-maps {
  width: 4rem;
}

@media (min-width: 800px) {
  .location-compo {
    width: 70vw;
  }
  .location-compo p {
    font-size: 1.4rem;
  }
  .location-compo .google-maps {
    margin-top: 1rem;
    width: 6rem;
  }
}
@media (min-width: 1000px) {
  .location-compo {
    gap: 0.5rem;
    padding-top: 1rem;
    padding-bottom: 2rem;
    width: 50vw;
  }
  .location-compo h2 {
    margin-bottom: 1rem;
  }
  .location-compo .google-maps {
    margin-top: 1rem;
  }
}
footer {
  padding: 1rem 1.5rem;
  font-size: 1rem;
  background-color: #999;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: left;
}

.credits {
  display: flex;
  flex-direction: column;
}

.contact .line {
  display: flex;
  align-items: center;
}
.contact .line img {
  height: 1.4rem;
  width: 1.4rem;
  display: block;
  margin-right: 0.3rem;
}
.contact .line p {
  line-height: 1.9rem;
}

@media (min-width: 800px) {
  .credits {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .contact .line img {
    height: 1.4rem;
    width: 1.4rem;
  }
  .contact .line p {
    font-size: 1rem;
  }
}
@media (min-width: 1000px) {
  .credits {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
  }
  .contact .line img {
    height: 1.6rem;
    width: 1.6rem;
  }
  .contact .line p {
    font-size: 1.1rem;
  }
}
.login-compo {
  min-height: 60vh;
}
.login-compo form {
  gap: 0.2rem;
}

.loading-text {
  font-size: 1.4rem;
  text-align: center;
  font-weight: 600;
}

.peak-line {
  display: flex;
  align-items: center;
}
.peak-line figure {
  margin-left: 0.2rem;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
}

.login-compo form label {
  font-weight: 700;
}
.login-compo form button {
  margin-top: 0.7rem;
}

@media (min-width: 800px) {
  .login-compo {
    min-height: 65vh;
  }
}
@media (min-width: 1000px) {
  .login-compo {
    min-height: 70vh;
  }
}
.modal-box p {
  font-size: 1.3rem;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover, a:active {
  color: orange;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: open-sans;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

.home {
  flex: 1;
  background-color: #f0e8d9;
  padding: 0.94rem;
}

h1 {
  font-family: graduate;
  font-weight: 500;
}

h2 {
  font-size: 1.9rem;
  color: #0f4c61;
}

button {
  cursor: pointer;
  padding: 0.6rem;
  font-size: 1rem;
  font-weight: 800;
  background-color: black;
  color: white;
  border-radius: 4px;
  border: none;
}

button:active, button:hover {
  color: orange;
}

.admin-badge {
  color: #b62aee;
  font-weight: 700;
}

img {
  width: 100%;
  height: 100%;
  display: block;
}

@media (min-width: 800px) {
  h2 {
    font-size: 2.4rem;
  }
  button {
    padding: 0.6rem;
    font-size: 1rem;
  }
}
@media (min-width: 1000px) {
  h2 {
    font-size: 2.6rem;
  }
  .home {
    background-color: #671e80;
    padding: 0rem;
  }
}

/*# sourceMappingURL=app.cs.map */
