import heroImg from '../assets/main.png'

export async function rAll() {
  try {
    const data = {
      hero: {
        title: 'Welcome to Weixies Webshop',
        description: 'We are ready to make simple and fast web application for you!',
        // image: 
        image: 'https://i.pinimg.com/1200x/91/90/2f/91902fdb1371e8cbcd3a49c2a99a1f33.jpg'
      },
      about: {
        title: 'About Us',
        subtitle: 'We construct the best solution.',
        description: 'We are dedicated to providing the best web solutions for your business. Our team of experts works tirelessly to ensure your success.'
      },
      features: [
        {
          name: 'Global Shipping',
          description: 'We ship to over 50 countries worldwide with reliable tracking and fast delivery times.',
          icon: 'globe',
        },
        {
          name: 'No Hidden Fees',
          description: 'What you see is what you pay. We believe in transparent pricing with no surprise charges at checkout.',
          icon: 'scale',
        },
        {
          name: 'Instant Delivery',
          description: 'For digital products, receive your order immediately via email. Physical goods are dispatched within 24 hours.',
          icon: 'lightning',
        },
        {
          name: 'Secure Payments',
          description: 'Your security is our priority. All transactions are encrypted and processed through secure gateways.',
          icon: 'shield',
        },
      ],
      products: [
        {
          id: 1,
          name: 'Modern Dashboard UI',
          imageSrc: 'https://i.pinimg.com/1200x/05/9a/c8/059ac8a56be86d74fadc8a59df98339f.jpg',
          imageAlt: "Landscape project overview of analytics dashboard.",
        },
        {
          id: 2,
          name: 'E-Commerce Platform',
          imageSrc: 'https://i.pinimg.com/1200x/50/2c/c4/502cc4eeeaf39956a66e7fbe418e6a88.jpg',
          imageAlt: "Online shop interface on laptop.",
        },
        {
          id: 3,
          name: 'Social Media App',
          imageSrc: 'https://i.pinimg.com/1200x/fc/83/ab/fc83abe3c1d51db7b756ea4ddb0e432b.jpg',
          imageAlt: "Social media application on mobile.",
        },
        {
          id: 4,
          name: 'Cloud Infrastructure',
          imageSrc: 'https://i.pinimg.com/1200x/bf/3d/61/bf3d6103487848c8a699af0a904b606c.jpg',
          imageAlt: "Abstract technology network background.",
        },
        {
          id: 5,
          name: 'Finance Tracker',
          imageSrc: 'https://i.pinimg.com/1200x/58/1f/fa/581ffad7eb64d28b7d5b9747ee153ece.jpg',
          imageAlt: "Financial charts and graphs.",
        },
      ],
      testimonials: [
        {
          id: 1,
          quote: "Weixies Webshop transformed how I find gear. The quality is unmatched and delivery was super fast.",
          author: "Judith Black",
          role: "CEO at Workcation",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
          id: 2,
          quote: "The customer service is outstanding. They helped me find exactly what I needed in minutes.",
          author: "Tom Cook",
          role: "Director of Product at Ease",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
          id: 3,
          quote: "I love the clean design and easy checkout process. Highly recommended store!",
          author: "Sarah Hansen",
          role: "Designer at Mirage",
          image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
      ],
      cta: {
        title: 'Ready to order your project?',
        subtitle: 'Start ordering your project today.',
        btnPrimary: 'Get started',
        btnSecondary: 'Learn more'
      }
    }
    return data
  } catch (err) {
    console.error('rAll error:', err)
    throw err
  }
}