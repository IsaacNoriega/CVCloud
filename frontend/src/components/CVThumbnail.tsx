interface CVThumbnailProps {
  templateId: string;
}

export function CVThumbnail({ templateId }: CVThumbnailProps) {
  const normalize = (id: string) => {
    if (!id) return id;
    const map: Record<string, string> = {
      // aliases used in other parts of the app -> canonical ids used here
      leftbar: 'sidebar-dark',
      sidebar: 'sidebar-dark',
      header: 'executive',
      executive: 'executive',
      minimal: 'minimal-premium',
      'minimal-premium': 'minimal-premium',
      grid: 'modern-grid',
      'modern-grid': 'modern-grid',
      compact: 'compact',
      elegante: 'elegant',
      elegant: 'elegant',
    };

    const key = id.toLowerCase();
    return map[key] ?? key;
  };

  const id = normalize(templateId);

  const renderThumbnail = () => {
    switch (id) {
      case 'executive':
        return (
          <div className="w-full h-full bg-white p-4 text-[4px]">
            <div className="border-b-2 border-gray-900 pb-2">
              <div className="h-2 w-16 bg-gray-900 mb-1"></div>
              <div className="h-1 w-20 bg-gray-400"></div>
            </div>
            <div className="mt-2 space-y-2">
              <div className="h-1 w-full bg-gray-200"></div>
              <div className="border-l-2 border-gray-900 pl-1 space-y-1">
                <div className="h-1 w-12 bg-gray-300"></div>
                <div className="h-1 w-16 bg-gray-200"></div>
              </div>
            </div>
          </div>
        );
      
      case 'minimal-premium':
        return (
          <div className="w-full h-full bg-white p-4 text-[4px]">
            <div className="text-center border-b border-gray-200 pb-2">
              <div className="h-2 w-12 bg-gray-900 mx-auto mb-1"></div>
              <div className="h-1 w-16 bg-gray-400 mx-auto"></div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-1 w-full bg-gray-200 mx-auto"></div>
              <div className="space-y-1 text-center">
                <div className="h-1 w-10 bg-gray-300 mx-auto"></div>
                <div className="h-1 w-14 bg-gray-200 mx-auto"></div>
              </div>
            </div>
          </div>
        );
      
      case 'sidebar-dark':
        return (
          <div className="w-full h-full flex text-[4px]">
            <div className="w-[40%] bg-gray-900 p-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full mx-auto mb-2"></div>
              <div className="space-y-1">
                <div className="h-1 w-full bg-gray-700"></div>
                <div className="h-1 w-8 bg-gray-700"></div>
              </div>
            </div>
            <div className="flex-1 bg-white p-2">
              <div className="space-y-1">
                <div className="h-1 w-full bg-gray-200"></div>
                <div className="h-1 w-12 bg-gray-300"></div>
              </div>
            </div>
          </div>
        );
      
      case 'modern-grid':
        return (
          <div className="w-full h-full bg-gray-50 p-2 text-[4px]">
            <div className="bg-gray-900 p-2 rounded mb-1">
              <div className="h-1.5 w-10 bg-white"></div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="bg-white p-1 rounded border border-gray-200">
                <div className="h-1 w-6 bg-gray-300"></div>
              </div>
              <div className="bg-white p-1 rounded border border-gray-200">
                <div className="h-1 w-6 bg-gray-300"></div>
              </div>
            </div>
          </div>
        );
      
      case 'compact':
        return (
          <div className="w-full h-full bg-white p-3 text-[4px]">
            <div className="flex gap-2 border-b-2 border-gray-900 pb-2">
              <div className="w-4 h-4 bg-gray-900 rounded-full shrink-0"></div>
              <div>
                <div className="h-1.5 w-12 bg-gray-900 mb-1"></div>
                <div className="h-1 w-14 bg-gray-400"></div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1">
              <div className="col-span-2 space-y-1">
                <div className="h-1 w-full bg-gray-200"></div>
              </div>
              <div className="space-y-1">
                <div className="h-1 w-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        );
      
      case 'elegant':
        return (
          <div className="w-full h-full bg-white p-3 text-[4px] relative">
            <div className="absolute top-0 left-3 right-3 h-0.5 bg-gray-900"></div>
            <div className="pt-2 text-center space-y-1">
              <div className="h-2 w-12 bg-gray-900 mx-auto"></div>
              <div className="h-px w-6 bg-gray-300 mx-auto"></div>
              <div className="h-1 w-16 bg-gray-400 mx-auto"></div>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex gap-1 items-center">
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <div className="h-1 w-12 bg-gray-300"></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-full bg-white p-4">
            <div className="h-2 w-16 bg-gray-900 mb-2"></div>
            <div className="space-y-1">
              <div className="h-1 w-full bg-gray-200"></div>
              <div className="h-1 w-3/4 bg-gray-200"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full">
      {renderThumbnail()}
    </div>
  );
}
