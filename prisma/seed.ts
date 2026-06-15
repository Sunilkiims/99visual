import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env') })

import { PrismaClient, Role, PostStatus, SchemaType } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { Pool } = pg

const post1Content = [
  '<h2>What is Digital Transformation?</h2>',
  '<p>Digital transformation integrates digital technology into all areas of a business.</p>',
  '<h2>Key Trends Shaping 2024</h2>',
  '<h3>1. AI-Powered Automation</h3>',
  '<p>Artificial intelligence is actively reshaping industries today.</p>',
  '<h3>2. Cloud-First Architecture</h3>',
  '<p>Organizations are rapidly migrating infrastructure to cloud platforms.</p>',
  '<h3>3. Progressive Web Applications</h3>',
  '<p>Modern web applications built with Next.js deliver superior user experiences.</p>',
  '<h2>Conclusion</h2>',
  '<p>Digital transformation is an ongoing journey. Businesses that embrace change will succeed.</p>',
].join('\n')

const post2Content = [
  '<h2>Why SEO Matters for Next.js Applications</h2>',
  '<p>Search engine optimization is critical for any web application.</p>',
  '<h2>Using the Metadata API</h2>',
  '<p>Next.js 15 introduced an improved Metadata API for defining SEO metadata in page components.</p>',
  '<h2>Structured Data with JSON-LD</h2>',
  '<p>Implementing structured data helps search engines understand your content better.</p>',
  '<h2>Performance and Core Web Vitals</h2>',
  '<p>Google uses Core Web Vitals as a ranking signal. Next.js helps you achieve excellent scores.</p>',
  '<h2>Conclusion</h2>',
  '<p>Next.js provides an excellent foundation for building SEO-friendly web applications.</p>',
].join('\n')

async function main() {
  console.log('🌱 Seeding database...')

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter } as any)

  const bcrypt = await import('bcryptjs')
  const passwordHash = await bcrypt.hash('Admin@123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@99visual.com' },
    update: {},
    create: {
      email: 'admin@99visual.com',
      passwordHash,
      role: Role.ADMIN,
    },
  })
  console.log('✅ Admin user created:', admin.email)

  const author = await prisma.author.upsert({
    where: { slug: '99-visual-team' },
    update: {},
    create: {
      name: '99 Visual Team',
      slug: '99-visual-team',
      bio: 'Expert insights from the 99 Visual Solutions team.',
      email: 'team@99visual.com',
      avatarUrl: null,
    },
  })
  console.log('✅ Author created:', author.name)

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'web-development' },
      update: {},
      create: { name: 'Web Development', slug: 'web-development', description: 'Insights on modern web development.', color: '#3B82F6' },
    }),
    prisma.category.upsert({
      where: { slug: 'digital-marketing' },
      update: {},
      create: { name: 'Digital Marketing', slug: 'digital-marketing', description: 'SEO, social media, and digital marketing strategies.', color: '#10B981' },
    }),
    prisma.category.upsert({
      where: { slug: '3d-visualization' },
      update: {},
      create: { name: '3D Visualization', slug: '3d-visualization', description: 'Latest trends in 3D rendering and visualization.', color: '#8B5CF6' },
    }),
    prisma.category.upsert({
      where: { slug: 'technology' },
      update: {},
      create: { name: 'Technology', slug: 'technology', description: 'Technology news, trends, and industry insights.', color: '#F59E0B' },
    }),
    prisma.category.upsert({
      where: { slug: 'business-strategy' },
      update: {},
      create: { name: 'Business Strategy', slug: 'business-strategy', description: 'Business growth and strategic insights.', color: '#EF4444' },
    }),
  ])
  console.log('✅ Categories created:', categories.length)

  const tags = await Promise.all([
    prisma.tag.upsert({ where: { slug: 'nextjs' }, update: {}, create: { name: 'Next.js', slug: 'nextjs' } }),
    prisma.tag.upsert({ where: { slug: 'seo' }, update: {}, create: { name: 'SEO', slug: 'seo' } }),
    prisma.tag.upsert({ where: { slug: 'react' }, update: {}, create: { name: 'React', slug: 'react' } }),
    prisma.tag.upsert({ where: { slug: 'typescript' }, update: {}, create: { name: 'TypeScript', slug: 'typescript' } }),
    prisma.tag.upsert({ where: { slug: 'digital-transformation' }, update: {}, create: { name: 'Digital Transformation', slug: 'digital-transformation' } }),
    prisma.tag.upsert({ where: { slug: 'ai' }, update: {}, create: { name: 'AI', slug: 'ai' } }),
    prisma.tag.upsert({ where: { slug: 'gis' }, update: {}, create: { name: 'GIS', slug: 'gis' } }),
    prisma.tag.upsert({ where: { slug: 'branding' }, update: {}, create: { name: 'Branding', slug: 'branding' } }),
  ])
  console.log('✅ Tags created:', tags.length)

  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: '99 Visual Solutions',
      siteUrl: 'https://99visualsolutions.com',
      adminEmail: 'admin@99visual.com',
      footerText: '2024 99 Visual Solutions. All rights reserved.',
      linkedinUrl: 'https://www.linkedin.com/company/99-visual-solutions/',
      instagramUrl: 'https://www.instagram.com/99visualsolutions/',
    },
  })
  console.log('✅ Settings created')

  const post1 = await prisma.post.upsert({
    where: { slug: 'future-of-digital-transformation' },
    update: {},
    create: {
      title: 'The Future of Digital Transformation in 2024',
      slug: 'future-of-digital-transformation',
      excerpt: 'Explore how businesses are leveraging AI, cloud computing, and modern web technologies to drive digital transformation.',
      content: post1Content,
      status: PostStatus.PUBLISHED,
      featured: true,
      readingTime: 5,
      publishedAt: new Date('2024-01-15'),
      authorId: author.id,
      categoryId: categories[4].id,
      seo: {
        create: {
          metaTitle: 'The Future of Digital Transformation in 2024 | 99 Visual Solutions',
          metaDescription: 'Explore how businesses leverage AI, cloud computing, and modern web technologies to drive digital transformation.',
          keywords: 'digital transformation, AI, cloud computing, web development, business strategy',
          canonicalUrl: 'https://99visualsolutions.com/insights/future-of-digital-transformation',
          ogTitle: 'The Future of Digital Transformation in 2024',
          ogDescription: 'Explore how businesses leverage AI and modern technologies to drive transformation.',
          robots: 'index, follow',
          schemaType: SchemaType.BLOG_POSTING,
        },
      },
    },
  })

  await prisma.postTag.createMany({
    data: [
      { postId: post1.id, tagId: tags[4].id },
      { postId: post1.id, tagId: tags[5].id },
    ],
    skipDuplicates: true,
  })

  const post2 = await prisma.post.upsert({
    where: { slug: 'nextjs-seo-best-practices' },
    update: {},
    create: {
      title: 'Next.js SEO Best Practices for 2024',
      slug: 'nextjs-seo-best-practices',
      excerpt: 'A comprehensive guide to implementing SEO in Next.js 15 using App Router, metadata API, and structured data.',
      content: post2Content,
      status: PostStatus.PUBLISHED,
      featured: false,
      readingTime: 7,
      publishedAt: new Date('2024-02-10'),
      authorId: author.id,
      categoryId: categories[0].id,
      seo: {
        create: {
          metaTitle: 'Next.js SEO Best Practices for 2024 | 99 Visual Solutions',
          metaDescription: 'A comprehensive guide to implementing SEO in Next.js 15 using App Router, metadata API, structured data, and performance optimization.',
          keywords: 'Next.js SEO, App Router, metadata API, structured data, JSON-LD',
          canonicalUrl: 'https://99visualsolutions.com/insights/nextjs-seo-best-practices',
          ogTitle: 'Next.js SEO Best Practices for 2024',
          ogDescription: 'Learn how to implement SEO in Next.js 15 with App Router and metadata API.',
          robots: 'index, follow',
          schemaType: SchemaType.BLOG_POSTING,
        },
      },
    },
  })

  await prisma.postTag.createMany({
    data: [
      { postId: post2.id, tagId: tags[0].id },
      { postId: post2.id, tagId: tags[1].id },
      { postId: post2.id, tagId: tags[3].id },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Sample posts created')
  console.log('🎉 Database seeding complete!')

  await prisma.$disconnect()
  await pool.end()
}

main().catch((e) => {
  console.error('❌ Seed error:', e)
  process.exit(1)
})