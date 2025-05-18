export interface FormData {
  photoName: string;
  photoUrl: string;
  photoDescription?: string;
  addedFromForm: boolean;
}

export interface FormProps {
  addImageToList: (data: FormData) => void;
}

export interface ImageListItem {
  photoName: string;
  photoUrl?: string;
  urls?: { regular: string };
  alt_description?: string;
  description?: string;
  created_at: string;
  addedFromForm?: boolean;
}

export interface ImageListProps {
  imageList: ImageListItem[];
  onDeleteImage: (index: number) => void;
}
