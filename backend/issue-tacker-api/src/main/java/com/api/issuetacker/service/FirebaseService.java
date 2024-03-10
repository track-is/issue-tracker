package com.api.issuetacker.service;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;


@Service
public class FirebaseService {
    private final String parentFolder = "issues/";
    private final String bucketName = "issue-tracker-d3b2f.appspot.com";
    private final String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/"+bucketName+"/o/%s?alt=media";


    public String upload(MultipartFile multipartFile) {

        try {
            String fileName = multipartFile.getOriginalFilename();                        // to get original file name
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));  // to generated random string values for file name.

            File file = this.convertToFile(multipartFile,  fileName);                      // to convert multipartFile to File
            String tempURL = this.uploadFile(file, parentFolder + fileName);                                   // to get uploaded file link
            file.delete();                                                                // to delete the copy of uploaded file stored in the project folder
            return tempURL;                     // Your customized response
        } catch (Exception e) {
            e.printStackTrace();
            return new String("Something Went Wrong");
        }

    }

    public Object download(String fileName) throws IOException {
        String destFileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));     // to set random strinh for destination file name
        String destFilePath = "Z:\\New folder\\" + destFileName;                                    // to set destination file path

        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream("path of JSON with genarated private key"));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        Blob blob = storage.get(BlobId.of("your bucket name", fileName));
        blob.downloadTo(Paths.get(destFilePath));
        return new String( "Successfully Downloaded!");
    }


    private String uploadFile(File file, String fileName) throws IOException {
        ClassPathResource res = new ClassPathResource("src/main/resources/issueTrackerfirebaseFile.json");
        File firebaseConfigFile = new File(res.getPath());

        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream(firebaseConfigFile));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }



}
