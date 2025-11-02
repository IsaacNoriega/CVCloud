import { useState } from 'react';
import { FileText, Edit, Download, Trash2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { CVThumbnail } from './CVThumbnail';

interface CVCardProps {
  id: string;
  title: string;
  thumbnail?: string;
  templateId?: string;
  onEdit: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CVCard({ id, title, thumbnail, templateId, onEdit, onDownload, onDelete }: CVCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group relative overflow-hidden transition-all hover:shadow-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="aspect-[3/4] bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
          {templateId ? (
            <CVThumbnail templateId={templateId} />
          ) : thumbnail ? (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          ) : (
            <FileText className="h-16 w-16 text-muted-foreground" />
          )}
          
          {isHovered && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 animate-in fade-in duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}
                className="p-3 bg-white rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(id);
                }}
                className="p-3 bg-white rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="p-3 bg-white rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h4>{title}</h4>
        </div>
      </CardContent>
    </Card>
  );
}
