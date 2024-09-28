const primary = [
    {
        id: 1,
        starred: true,
        readed: true,
        name: "Peter, me",
        title: "Hello",
        description: "Trip home from Colombo has been arranged, then Jenna will come get me from Stockholm. :)",
        date: "Mar 7",
        tabtype: "Inbox",
        userImg: "assets/images/users/avatar-2.jpg",
        labeltype: "Support"
    },
    {
        id: 2,
        starred: true,
        readed: true,
        name: "Susanna",
        title: "Freelance - Since you asked... and i'm inconceivably bored at the train station",
        description: "Alright thanks. I'll have to re-book that somehow, i'll get back to you.",
        date: "Mar 7",
        tabtype: "Sent",
        userImg: "assets/images/users/avatar-3.jpg",
        labeltype: "Freelance"
    },
    {
        id: 3,
        starred: false,
        readed: false,
        name: "Web Support Dennis",
        countd: 7,
        title: "Re New mail settings",
        desciption: "Will you answer him asap?",
        date: "Mar 5",
        tabtype: "Trash",
        userImg: "assets/images/users/avatar-4.jpg",
        labeltype: "Social"
    }, {
        id: 4,
        starred: false,
        readed: true,
        name: "Peter",
        title: "Support - Off on Thursday",
        description: "Eff that place, you might as well stay here with us instead! Sent from my iPhone 4  4 mar 2014 at 5:55 pm",
        date: "Mar 4",
        tabtype: "Sent",
        userImg: "assets/images/users/avatar-5.jpg",
        labeltype: "Support"
    }, {
        id: 5,
        starred: false,
        readed: true,
        name: "Medium",
        title: "Social - This Week's Top Stories",
        description: "Our top pick for you on Medium this week The Man Who Destroyed America’s Ego",
        date: "Feb 28",
        tabtype: "Inbox",
        userImg: "assets/images/users/avatar-6.jpg",
        labeltype: "Support"
    }, {
        id: 6,
        starred: true,
        readed: true,
        name: "Death to Stock",
        title: "Montly High-Res Photos",
        description: "To create this month's pack, we hosted a party with local musician Jared Mahone here in Columbus, Ohio.",
        date: "Feb 28",
        tabtype: "Inbox",
        userImg: "assets/images/users/user-dummy-img.jpg",
        labeltype: "Friends"
    }, {
        id: 7,
        starred: false,
        readed: false,
        name: "Miller, me",
        countd: 5,
        title: "Faily - Last pic over my village",
        desciption: "Yeah i'd like that! Do you remember the video you showed me of your train ride between Colombo and Kandy? The one with the mountain view? I would love to see that one again!",
        date: "Feb 27",
        tabtype: "Inbox",
        userImg: "assets/images/users/avatar-8.jpg",
        labeltype: "Freelance"
    }, {
        id: 7,
        starred: false,
        readed: false,
        name: "Andrew Zimmer",
        countd: 2,
        title: "Mohila Beta: Subscription Confirmed",
        desciption: "You've been confirmed! Welcome to the ruling class of the inbox. For your records, here is a copy of the information you submitted to us...",
        date: "Feb 27",
        tabtype: "Draft",
        userImg: "assets/images/users/avatar-9.jpg",
        labeltype: "Social"
    }, {
        id: 9,
        starred: true,
        readed: true,
        name: "Infinity HR",
        title: "Sveriges Hetaste sommarjobb",
        description: "Hej Nicklas Sandell! Vi vill bjuda in dig till \"First tour 2014\", ett rekryteringsevent som erbjuder jobb på 16 semesterorter iSverige.",
        date: "Feb 27",
        tabtype: "Starred",
        userImg: "assets/images/users/avatar-10.jpg",
        labeltype: "Support"
    }, {
        id: 10,
        starred: true,
        readed: true,
        name: "Revibe",
        title: "Friends - Weekend on Revibe",
        description: "Today's Friday and we thought maybe you want some music inspiration for the weekend. Here are some trending tracks and playlists we think you should give a listen!",
        date: "Feb 26",
        tabtype: "Starred",
        userImg: "assets/images/users/user-dummy-img.jpg",
        labeltype: "Support"
    }, {
        id: 11,
        starred: false,
        readed: true,
        name: "Erik, me",
        title: "Regarding our meeting",
        description: "That's great, see you on Thursday!",
        date: "Feb 25",
        tabtype: "Inbox",
        userImg: "assets/images/users/avatar-4.jpg",
        labeltype: "Social"
    }, {
        id: 12,
        starred: false,
        readed: false,
        name: "KanbanFlow",
        title: "Social - Task assigned: Clone ARP's website",
        description: "You have been assigned a task by Alex@Work on the board Web.",
        date: "Feb 24",
        tabtype: "Inbox",
        userImg: "assets/images/users/avatar-5.jpg",
        labeltype: "Friends"
    }, {
        id: 13,
        starred: false,
        readed: false,
        name: "Tobias Berggren",
        title: "Let's go fishing!",
        description: "Hey, You wanna join me and Fred at the lake tomorrow? It'll be awesome.",
        date: "Feb 23",
        tabtype: "Inbox",
        userImg: "assets/images/users/user-dummy-img.jpg",
        labeltype: "Family"
    }, {
        id: 14,
        starred: false,
        readed: true,
        name: "Charukaw, me",
        title: "Hey man",
        description: "Nah man sorry i don't. Should i get it?",
        date: "Feb 23",
        tabtype: "Important",
        userImg: "assets/images/users/avatar-8.jpg",
        labeltype: "Support"

    }, {
        id: 15,
        starred: true,
        readed: true,
        name: "Peter",
        title: "Support - Home again!",
        description: "That's just perfect! See you tomorrow.",
        date: "Feb 21",
        tabtype: "Starred",
        userImg: "assets/images/users/avatar-10.jpg",
        labeltype: "Freelance"
    }, {
        id: 16,
        starred: true,
        readed: true,
        name: "Stack Exchange",
        title: "1 new items in your Stackexchange inbox",
        description: "The following items were added to your Stack Exchange global inbox since you last checked it.",
        date: "Feb 21",
        tabtype: "Starred",
        userImg: "assets/images/users/user-dummy-img.jpg",
        labeltype: "Freelance"
    }, {
        id: 17,
        starred: false,
        readed: true,
        name: "Google Drive Team",
        title: "You can now use your storage in Google Drive",
        description: "Hey Nicklas Sandell! Thank you for purchasing extra storage space in Google Drive.",
        date: "Feb 20",
        tabtype: "Spam",
        userImg: "assets/images/users/avatar-6.jpg",
        labeltype: "Social"
    }, {
        id: 18,
        starred: false,
        readed: true,
        name: "Susanna",
        title: "Train/Bus",
        description: "Yes ok, great! I'm not stuck in Stockholm anymore, we're making progress.",
        date: "Feb 19",
        tabtype: "Draft",
        userImg: "assets/images/users/user-dummy-img.jpg",
        labeltype: "Friends"
    }
]
const social = [
    {
        id: 21,
        starred: true,
        readed: false,
        name: "Peter, me",
        title: "Hello",
        description: "Trip home from Colombo has been arranged, then Jenna will come get me from Stockholm. :)",
        date: "Mar 7",
        tabtype: "Inbox",
        userImg: "assets/images/users/avatar-8.jpg",
        labeltype: "Social"
    },
    {
        id: 22,
        starred: true,
        readed: false,
        name: "Susanna",
        title: "Freelance - Since you asked... and i'm inconceivably bored at the train station",
        description: "Alright thanks. I'll have to re-book that somehow, i'll get back to you.",
        date: "Mar 7",
        tabtype: "Sent",
        userImg: "assets/images/users/avatar-10.jpg",
        labeltype: "Social"
    },
    {
        id: 23,
        starred: false,
        readed: true,
        name: "Web Support Dennis",
        countd: 7,
        title: "Re New mail settings",
        desciption: "Will you answer him asap?",
        date: "Mar 5",
        tabtype: "Trash",
        userImg: "assets/images/users/avatar-3.jpg",
        labeltype: "Social"
    }
]
const promotions = [
    {
        id: 24,
        starred: false,
        readed: false,
        name: "Google Drive Team",
        title: "You can now use your storage in Google Drive",
        description: "Hey Nicklas Sandell! Thank you for purchasing extra storage space in Google Drive.",
        date: "Feb 20",
        tabtype: "Spam",
        userImg: "assets/images/users/user-dummy-img.jpg",
        labeltype: "Social"
    },
    {
        id: 25,
        starred: false,
        readed: true,
        name: "Susanna",
        title: "Train/Bus",
        description: "Yes ok, great! I'm not stuck in Stockholm anymore, we're making progress.",
        date: "Feb 19",
        tabtype: "Draft",
        userImg: "assets/images/users/avatar-3.jpg",
        labeltype: "Social"
    }
]


export { promotions, social, primary }