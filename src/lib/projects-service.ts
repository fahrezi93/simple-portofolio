import { supabase } from './supabase';

export interface ProjectData {
  id?: string;
  title: string;
  description: string;
  category: 'development' | 'design' | 'video';
  type?: string;
  year: string;
  image_url: string;
  demo_url?: string;
  github_url?: string;
  technologies: string[];
  status?: string;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export class ProjectsService {
  /**
   * Get featured projects
   */
  static async getFeaturedProjects(category?: string): Promise<{
    success: boolean;
    data?: ProjectData[];
    error?: string;
  }> {
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('featured', true);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching featured projects:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return { success: false, error: 'Failed to fetch featured projects' };
    }
  }
}
