// const searchInput = document.getElementById('searchInput');
// var forumThread = document.getElementById('forum-thread');

// searchInput.addEventListener('keyup', function () {
//   const filter = this.value.toLowerCase();
//   const posts = forumThread.querySelectorAll('.post');

//   posts.forEach(post => {
//     const titleElement = post.querySelector('.post-title');
//     if (!titleElement) return;

//     const titleText = titleElement.textContent.toLowerCase();

//     if (titleText.indexOf(filter) > -1) {
//       post.style.display = ''; // show post
//     } else {
//       post.style.display = 'none'; // hide post
//     }
//   });
// });



//the space to display replies posts and all that
const forumThread = document.getElementById('forum-thread');

//static array of posts created using java object int eh format of json
let posts = [
    {
        author: "Anusha DBS",
        title: "Resources for Job preparation",
        content: "Can anyone suggest good resources for preparing technical interviews?",
        image: "",
        date: "2025-09-25 10:30 AM",
        replies: [
            {
                author: "Pallavi K",
                title: "",
                content: "Try LeetCode's NeetCode 150, and mock interviews on InterviewBit.",
                image: "",
                date: "2025-09-25 10:55 AM"
            }
        ]
    },
    {
        author: "Karthik Sharma",
        title: "Alumini Insights",
        content: `1. Anusha DBS (Class of 2018, Computer Science) — Building Tomorrow’s Tech

“After graduation, I joined DBS Technologies as a junior developer. I quickly realized my passion lay in cloud computing and AI, so I dedicated evenings to open-source contributions and learning machine learning. Three years later, I’m now a Technical Lead in the AI team, working on large-scale solutions for healthcare. My advice: Keep learning, embrace challenges, and never underestimate the power of community connections.”

2. Pallavi K (Class of 2017, Information Technology) — Leading With Empathy

“I started my career in user research, but switched to product management after discovering my love for building things that genuinely help people. Today, I lead cross-functional teams, bridging developers and designers, and recently launched a mobile app for financial literacy. To younger alumni: Don’t be afraid to step outside your comfort zone—sometimes your strengths reveal themselves in unexpected roles.”

3. Prasad Reddy (Class of 2016, Electrical Engineering) — Innovating Through Curiosity

“As a Data Scientist, I pioneered real-time analytics for logistics at a leading startup. The transition wasn’t easy—I spent months upskilling with online materials and alumni study groups. Within two years, I published my first research paper and led a successful product deployment. Alumni collaboration is invaluable, so reach out and keep learning from each other!”

4. Karthik Sharma (Class of 2015, Computer Science) — From Campus to CTO

“From coding competitions at college to founding my own SaaS startup, the journey has been intense but satisfying. The alumni network was vital—I found my co-founder in an online forum! My mantra: Seek mentorship, embrace failures, and always give back to the community.”

5. Bhavani S (Class of 2014, UX & Web Development) — Designing Impact

“I transitioned from front-end engineering to UX design after volunteering for an alumni website revamp. That led to a career pivot, working for global clients and presenting at industry conferences. My advice: Volunteer for new projects and don’t hesitate to showcase your work—you never know what doors it may open.”

6. Anuradha M (Class of 2013, Business Analytics) — Giving Back Through Leadership

“After a decade in business analytics, I returned to mentor alumni seeking career changes. Now I’m an executive coach, helping others harness their potential and find purpose at work and beyond. Our alumni community is our secret advantage. Support each other, and success will follow.”
`,
        image: "https://ink.enderuncolleges.com/wp-content/uploads/2017/10/Screenshot-411.png",
        date: "2025-09-24 4:15 PM",
        replies: []

    },
    {
        author: "Bhavani S",
        title: "Alumini Award Ceremony",
        content: `
Celebrating outstanding achievements across batches.

The Annual Alumni Award Ceremony honors exceptional contributions and achievements by our alumni community. This year’s event highlighted trailblazers in technology, social work, entrepreneurship, and academia.

Join us in congratulating all the awardees who continue to make us proud. Their stories inspire future generations to excel and give back.
`,
        image: "https://tse1.mm.bing.net/th/id/OIP.S3obHYDag1WDwEP7VA3YRwHaEK?pid=Api&P=0&h=180",
        date: "2025-09-26 2:00 PM",
        replies: [
            {
                author: "Anusha DBS",
                content: "Congratulations to all awardees! Truly inspiring achievements.",
                image: "",
                date: "2025-09-26 3:15 PM"
            }
        ]
    }
];

//read image file 
function readImageFile(file) {
    return new Promise((resolve) => {
        if (!file) {
            resolve("");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

//how the static posts array is rendereing on the webpage
function renderPosts() {
    forumThread.innerHTML = "";
    posts.forEach((post, idx) => {
        const postDiv = document.createElement('div');
        postDiv.className = "forum-post";
        postDiv.innerHTML = `
          <div class="post-header">${post.author || "Anonymous"}</div>
          <div class="post-meta">${post.date}</div>
          ${post.image ? `<img class="post-image" src="${post.image}" alt="Post image" />` : ""}
          <div class="post-title"><h2>${post.title}</h2></div>
          <div class="post-content">${post.content}</div>
          <button class="reply-btn" data-idx="${idx}">Reply</button>
          <form class="reply-form" data-idx="${idx}">
            <input type="text" class="reply-author" placeholder="Your name (optional)" />
            <textarea class="reply-content" placeholder="Write a reply..." required></textarea>
            <input type="file" class="reply-image" accept="image/*" />
            <button type="submit">Post Reply</button>
          </form>
          <div class="replies">
            ${post.replies.map(reply => `
              <div class="forum-reply">
                <div><strong>${reply.author || "Anonymous"}</strong> <span style="color:#aaa;font-size:0.91rem;">${reply.date}</span></div>
                ${reply.image ? `<img class="reply-image" src="${reply.image}" alt="Reply image" />` : ""}
                <div>${reply.content}</div>
              </div>
            `).join('')}
          </div>
        `;
        forumThread.appendChild(postDiv);
    });

    //if there is any reply 
    document.querySelectorAll('.reply-btn').forEach(btn => {
        btn.onclick = function () {
            const idx = btn.getAttribute('data-idx');
            const form = document.querySelector(`.reply-form[data-idx="${idx}"]`);
            form.style.display = form.style.display === "flex" ? "none" : "flex";
        };
    });

    document.querySelectorAll('.reply-form').forEach(form => {
        form.onsubmit = async function (e) {
            e.preventDefault();
            const idx = +form.getAttribute('data-idx');
            const author = form.querySelector('.reply-author').value.trim();
            const content = form.querySelector('.reply-content').value.trim();
            const imageFile = form.querySelector('.reply-image').files[0];

            if (!content) return;

            const image = await readImageFile(imageFile);

            posts[idx].replies.push({
                author, content, image,
                date: new Date().toLocaleString('en-GB', {
                    hour: "2-digit", minute: "2-digit", hour12: true,
                    day: "2-digit", month: "short", year: "numeric"
                })
            });
            renderPosts();
        };
    });
}

//when a new post is created by clicking post
document.getElementById('create-post-form').onsubmit = async function (e) {
    e.preventDefault();
    const author = document.getElementById('post-author').value.trim();
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const imageFile = document.getElementById('post-image').files[0];

    if (!content) return;

    //to read image file 
    const image = await readImageFile(imageFile);
    //to add time stamp upon adding a post or reply
    posts.unshift({
        author, title, content, image,
        date: new Date().toLocaleString('en-GB', {
            hour: "2-digit", minute: "2-digit", hour12: true,
            day: "2-digit", month: "short", year: "numeric"
        }),
        replies: []
    });
    this.reset();
    renderPosts();
};

renderPosts();


