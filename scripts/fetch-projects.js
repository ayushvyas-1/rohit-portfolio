
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FOLDERS = [
    'Cybertruck',
    'Game Ready Gun',
    'Headphone',
    'Medicine cabinet',
    'Radio',
    'War helmet',
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchProjects() {
    console.log('Fetching projects from Cloudinary...');
    const projects = [];

    for (const folder of FOLDERS) {
        console.log(`Fetching folder: ${folder}`);
        try {
            // Search for resources in the folder (images and videos)
            // Note: Cloudinary search by folder might return mixed types, but we want to be sure.
            // We will fetch both and combine.

            const imageResult = await cloudinary.search
                .expression(`folder:"${folder}" AND resource_type:image`)
                .sort_by('public_id', 'desc')
                .max_results(100)
                .execute();

            const videoResult = await cloudinary.search
                .expression(`folder:"${folder}" AND resource_type:video`)
                .sort_by('public_id', 'desc')
                .max_results(100)
                .execute();

            const resources = [...videoResult.resources, ...imageResult.resources];

            if (resources.length === 0) {
                console.warn(`No assets found in folder: ${folder}`);
                continue;
            }

            // Helper to add optimization params
            const optimizeUrl = (url) => {
                return url.replace('/upload/', '/upload/f_auto,q_auto/');
            };

            // Map resources to URLs and optimize
            const imageUrls = resources.map((res) => optimizeUrl(res.secure_url));

            // Use the first image as thumbnail (filter for image type if possible)
            const thumbnailResource = resources.find(r => r.resource_type === 'image') || resources[0];
            const thumbnail = optimizeUrl(thumbnailResource.secure_url);

            // Create project object
            const project = {
                id: folder.toLowerCase().replace(/\s+/g, '-'),
                title: folder,
                category: '3D Art', // Default category
                thumbnail: thumbnail,
                images: imageUrls,
                description: `High-quality 3D render of ${folder}. Showcasing detailed modeling and texturing.`, // Placeholder description
                software: [], // Placeholder
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
                likes: 0,
                views: 0,
            };

            projects.push(project);
        } catch (error) {
            console.error(`Error fetching folder ${folder}:`, error);
        }
    }

    // Define static skills
    const skills = [
        { name: 'Blender', level: 95, category: 'Software' },
        { name: 'Unreal Engine 5', level: 85, category: 'Software' },
        { name: 'Substance Painter', level: 90, category: 'Software' },
        { name: 'ZBrush', level: 80, category: 'Software' },
        { name: 'Hard Surface Modeling', level: 90, category: 'Technical' },
        { name: 'Lighting & Rendering', level: 85, category: 'Technical' },
        { name: 'UV Unwrapping', level: 95, category: 'Technical' },
    ];

    // Generate file content
    const fileContent = `import { Project, Skill } from '../types';

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

export const skills: Skill[] = ${JSON.stringify(skills, null, 2)};
`;

    // Write to data/projects.ts
    const outputPath = path.join(__dirname, '../data/projects.ts');
    fs.writeFileSync(outputPath, fileContent);
    console.log(`Successfully updated ${outputPath}`);
}

fetchProjects();
